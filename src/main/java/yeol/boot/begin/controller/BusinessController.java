package yeol.boot.begin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yeol.boot.begin.service.BusinessService;

import java.util.Map;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping("/status")
    public ResponseEntity<String> getStatus(@RequestBody Map<String, Object> request) {
        try {
            // 요청 본문에서 사업자 번호 목록 추출
            List<String> businessNumbers = (List<String>) request.get("b_no");

            // 서비스 호출을 통해 사업자 상태 정보를 조회
            String response = businessService.getStatusInfo(businessNumbers);
            return ResponseEntity.ok(response);  // 성공 시 결과 반환
        } catch (IOException e) {
            return ResponseEntity.status(500).body("API 호출 중 오류가 발생했습니다. (IOException)");  // IOException 발생 시 에러 메시지 반환
        } catch (Exception e) {
            e.printStackTrace();  // 예외 로그 출력
            return ResponseEntity.status(500).body("API 호출 중 알 수 없는 오류가 발생했습니다.");  // 그 외의 예외 처리
        }
    }
}
