package yeol.boot.begin.service;

import okhttp3.*;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

@Service  
public class BusinessService {

    // OkHttpClient를 사용하여 외부 API 호출
    private final OkHttpClient client = new OkHttpClient();
    
    // API 호출에 필요한 서비스 키 
    private final String serviceKey = "Decoding ServiceKey";

    // 외부 API를 호출하여 사업자 상태 정보를 가져오는 메서드
    public String getStatusInfo(List<String> businessNumbers) throws Exception {
        // API 요청 URL에 서비스 키를 포함하여 인코딩
        String url = "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey="
                + URLEncoder.encode(serviceKey, StandardCharsets.UTF_8);

        // Gson을 사용하여 사업자 번호 목록을 JSON 형식으로 변환
        String json = new Gson().toJson(Map.of("b_no", businessNumbers));

        RequestBody body = RequestBody.create(json, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder().url(url).post(body).build();

        // API 호출 및 응답 처리
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("API 응답 코드: " + response.code());  // 응답 코드 로그 출력
                throw new IOException("Unexpected code " + response);  // 오류 발생 시 예외 던짐
            }
            return response.body().string();  // 성공 시 응답 본문 반환
        } catch (Exception e) {
            e.printStackTrace();  // 예외 로그 출력
            throw new Exception("API 호출 중 오류 발생", e);  // API 호출 중 예외 처리
        }
    }

}
