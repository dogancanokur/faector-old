package net.okur.faector.error;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class ApiError {
    private int status;
    private String message;
    private String path;
    private long timestamp = new Date().getTime();
    private Map<String, String> validationErrors;

    public ApiError(int status, String message, String path, Map<String, String> validationErrors) {
        this.status = status;
        this.message = message;
        this.path = path;
        this.validationErrors = validationErrors;
    }
}
