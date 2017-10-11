package cmpe297.sjsu.edu.auralertandroidapp.service;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
import cmpe297.sjsu.edu.auralertandroidapp.model.*;

/**
 * Created by nilamdeka on 10/10/17.
 */

public interface RegistrationService {

    @POST("/alerts")
    Call<ResponseModel> register(@Body RegistrationRequest registrationRequest);
}

