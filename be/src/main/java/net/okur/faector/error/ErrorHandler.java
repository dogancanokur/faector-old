package net.okur.faector.error;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ErrorHandler implements ErrorController {

    private final ErrorAttributes errorAttributes; // this is not error(Could not autowire. No beans of 'ErrorAttributes' type found. )

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public ErrorHandler(ErrorAttributes errorAttributes) {
        this.errorAttributes = errorAttributes;
    }

    @RequestMapping("/error")
    public ApiError handleError(WebRequest webRequest) {

        ErrorAttributeOptions errorAttributeOptions = ErrorAttributeOptions.of(
                ErrorAttributeOptions.Include.MESSAGE,
                ErrorAttributeOptions.Include.BINDING_ERRORS);
        Map<String, Object> attributes =
                this.errorAttributes.getErrorAttributes(webRequest, errorAttributeOptions);
        String message = (String) attributes.get("message");
        String path = (String) attributes.get("path");

        int status = (int) attributes.get("status");
        ApiError apiError = new ApiError(status, message, path);
        if (attributes.containsKey("errors")) {
            List<FieldError> fieldErrorList = (List<FieldError>) attributes.get("errors");
            Map<String, String> validationErrors = new HashMap<>();
            for (FieldError fieldError : fieldErrorList) {
                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            apiError.setValidationErrors(validationErrors);
        }
        return apiError;
    }
}
