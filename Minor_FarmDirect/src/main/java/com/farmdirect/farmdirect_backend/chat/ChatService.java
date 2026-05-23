package com.farmdirect.farmdirect_backend.chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;

@Service
public class ChatService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.groq.com/openai/v1")
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("Content-Type", "application/json")
            .build();

    public String askAI(String userMessage) {

        Map<String, Object> body = Map.of(
                "model", "llama3-70b-8192",
                "messages", new Object[]{
                        Map.of("role", "system", "content", "You are a helpful Indian farming assistant."),
                        Map.of("role", "user", "content", userMessage)
                }
        );

        try {
            Map response = webClient.post()
                    .uri("/chat/completions")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            Map choice = ((java.util.List<Map>) response.get("choices")).get(0);
            Map message = (Map) choice.get("message");

            return message.get("content").toString();

        } catch (Exception e) {
            return "⚠️ Error contacting AI service.";
        }
    }
}
