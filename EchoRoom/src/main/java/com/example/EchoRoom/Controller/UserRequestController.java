package com.example.EchoRoom.Controller;

import com.example.EchoRoom.DTOs.AllRooms.AllRoomsDTO;
import com.example.EchoRoom.DTOs.AllRooms.AllRoomsResponse;
import com.example.EchoRoom.DTOs.ChatHistory.ChatHistoryResponse;
import com.example.EchoRoom.DTOs.CreateChatRoom.CreateChatRoomRequest;

import com.example.EchoRoom.DTOs.Message.MessageDTO;
import com.example.EchoRoom.DTOs.ChatHistory.ChatHistoryRequest;
import com.example.EchoRoom.DatabaseEntity.ChatRoom;
import com.example.EchoRoom.DatabaseEntity.MessageEntity;
import com.example.EchoRoom.DatabaseEntity.UserEntity;
import com.example.EchoRoom.MySqlRepositories.ChatRoomRepository;
import com.example.EchoRoom.MySqlRepositories.MessageRepository;
import com.example.EchoRoom.MySqlRepositories.UserRepository;
import com.example.EchoRoom.SecurityConfiguration.JwtUtility;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user")
public class UserRequestController {

    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/create-room")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> createRoom(@Valid @RequestBody CreateChatRoomRequest request,
                                        HttpServletRequest httpServletRequest){

        if(chatRoomRepository.findByHandle(request.getHandle()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Handle name already exists!");
        }
        String token = jwtUtility.extractTokenFromRequest(httpServletRequest);
        String email = jwtUtility.extractUserName(token);
        UserEntity user = userRepository.findByEmail(email);

        ChatRoom newChatRoom = ChatRoom.builder()
                .name(request.getName())
                .type(request.getType())
                .handle(request.getHandle())
                .description(request.getDescription())
                .admin(user)
                .members(Set.of(user))
                .build();

        try{
            chatRoomRepository.save(newChatRoom);
            return ResponseEntity.ok("Room Created Successfully!");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Internal Server Error");
        }
    }

    @GetMapping("/all-rooms")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> getAllRooms(@RequestParam int page ){

        Page<ChatRoom> rooms = chatRoomRepository.findAll(PageRequest.of(page,3));

        List<Long> roomIds = rooms.getContent().stream().map(
                ChatRoom::getId
        ).toList();

        List<AllRoomsDTO> responses= extractMembersForRooms(roomIds ,rooms);

        return ResponseEntity.ok(new AllRoomsResponse(page,rooms.isLast(),responses));
    }

    @GetMapping("/join-room")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> joinRoom(HttpServletRequest request,
                                      @RequestParam String handle)
    {
        String token = jwtUtility.extractTokenFromRequest(request);
        String email = jwtUtility.extractUserName(token);
        UserEntity user = userRepository.findByEmail(email);

        try{
            ChatRoom chatRoom = (ChatRoom) chatRoomRepository.findByHandle(handle).get();
            Set<UserEntity> members= chatRoom.getMembers();
            if(members.add(user)){
                chatRoom.setMembers(members);
                chatRoomRepository.save(chatRoom);
                return ResponseEntity.ok("You've successfully joined the room");
            }else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You're already a member of this room.");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error...");
        }
    }

    @GetMapping("/search-rooms")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> searchRooms(
            @RequestParam String type,
            @RequestParam String query,
            @RequestParam int page) {
        
        Page<ChatRoom> rooms;
        if (type.equals("name")) {
            rooms = chatRoomRepository.findByNameContainingIgnoreCase(query, PageRequest.of(page, 3));
        } else if (type.equals("handle")) {
            rooms = chatRoomRepository.findByHandleContainingIgnoreCase(query, PageRequest.of(page, 3));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid search type");
        }

        List<Long> roomIds = rooms.getContent().stream().map(
                ChatRoom::getId
        ).toList();

        List<AllRoomsDTO> responses = extractMembersForRooms(roomIds , rooms);

        return ResponseEntity.ok(new AllRoomsResponse(page, rooms.isLast(), responses));
    }

    @GetMapping("/my-rooms")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<?> myChatRooms(HttpServletRequest request,
                                         @RequestParam int page){

        String token = jwtUtility.extractTokenFromRequest(request);
        String email = jwtUtility.extractUserName(token);
        UserEntity user = userRepository.findByEmail(email);

        try{

            Page<ChatRoom> rooms = chatRoomRepository.findByMembersContaining(user, PageRequest.of(page,4));
            List<Long> roomIds = rooms.getContent().stream().map(
                    ChatRoom::getId
            ).toList();
            List<AllRoomsDTO> response = extractMembersForRooms(roomIds,rooms);

            return ResponseEntity.ok(new AllRoomsResponse(page, rooms.isLast(), response));

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Internal Server Error!");
        }
    }

    @GetMapping("/room-details")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<?> findMyRoomByHandle(@RequestParam String handle){
        try {
            ChatRoom chatRoom = (ChatRoom) chatRoomRepository.findByHandle(handle).get();
            return ResponseEntity.ok(new AllRoomsDTO(chatRoom.getName(), chatRoom.getDescription(), chatRoom.getHandle(),
                    chatRoom.getType(), chatRoom.getMembers().stream().toList()) );
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Fetching Room Details..");
        }
    }


    private List<AllRoomsDTO> extractMembersForRooms(List<Long> roomIds , Page<ChatRoom> rooms){
        Map<Long, List<UserEntity>> roomMemberMap = new HashMap<>();
        List<Object[]> resultList = chatRoomRepository.fetchMembersOfRooms(roomIds);
        for (Object[] row : resultList) {
            Long roomId = (Long) row[0];
            UserEntity member = (UserEntity) row[1];
            roomMemberMap.computeIfAbsent(roomId, k -> new ArrayList<>()).add(member);
        }

        return rooms.getContent().stream().map(
                (room)-> AllRoomsDTO.builder()
                        .name(room.getName())
                        .description(room.getDescription())
                        .handle(room.getHandle())
                        .type(room.getType())
                        .users(roomMemberMap.get(room.getId()))
                        .build()
        ).toList();
    }

    @PostMapping("/room-texts")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<?> fetchRoomTexts(@RequestBody ChatHistoryRequest request){
        try {
            ChatRoom chatRoom = (ChatRoom) chatRoomRepository.findByHandle(request.getHandle()).get();
            Page<MessageEntity> messageEntities = null;
            //System.out.println(request.getTime());
            if(request.getTime() == null)
                messageEntities = messageRepository.findByChatRoomOrderByTimeStampDesc(chatRoom , PageRequest.of(request.getPage(), 10));
            else
                messageEntities = messageRepository.findPreviousTexts(request.getTime(),chatRoom , PageRequest.of(request.getPage() , 10));
            List<MessageDTO> response = messageEntities.getContent().stream().map(
                    messageEntity-> new MessageDTO(messageEntity.getSender() , messageEntity.getContent() , request.getHandle())
            ).toList();

            ChatHistoryResponse finalResponse = new ChatHistoryResponse(response, request.getPage(), messageEntities.isLast(),messageEntities.getContent().get(response.size()-1).getTimeStamp());
            return ResponseEntity.ok(finalResponse);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Loading message history...");
        }
    }

    @PostMapping("/logout")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> logOut(HttpServletResponse response){
        //System.out.println("hiii");
//        Cookie cookie = new Cookie("jwt",null);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
//        cookie.setPath("/");
//        cookie.setMaxAge(0);
//        response.addCookie(cookie);

        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(60 * 60)
                .build();
        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok("logged out successfully");

    }

}
