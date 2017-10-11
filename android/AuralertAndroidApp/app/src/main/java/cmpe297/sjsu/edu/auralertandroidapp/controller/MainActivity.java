package cmpe297.sjsu.edu.auralertandroidapp.controller;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import cmpe297.sjsu.edu.auralertandroidapp.R;
import cmpe297.sjsu.edu.auralertandroidapp.model.RegistrationRequest;
import cmpe297.sjsu.edu.auralertandroidapp.model.ResponseModel;
import cmpe297.sjsu.edu.auralertandroidapp.service.RegistrationService;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static final int LOW = 200;
    private static final int HIGH = 400;

    private Button lowButton, highButton;
    private EditText phoneEditText, deviceIdEditText, msgEditText;
    private int threshold;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
    }

    private boolean isValidPhoneNumber(CharSequence phoneNumber) {

        return !TextUtils.isEmpty(phoneNumber) && Patterns.PHONE.matcher(phoneNumber).matches();
    }

    private void init() {

        phoneEditText = (EditText) findViewById(R.id.phone_edit_text);
        deviceIdEditText = (EditText) findViewById(R.id.device_id_edit_text);
        msgEditText = (EditText) findViewById(R.id.msg_edit_text);

        Button registerButton = (Button) findViewById(R.id.register_button);
        registerButton.setOnClickListener(this);

        lowButton = (Button) findViewById(R.id.low_button);
        lowButton.setOnClickListener(this);

        highButton = (Button) findViewById(R.id.high_button);
        highButton.setOnClickListener(this);

        // default values
        threshold = LOW;
        lowButton.setBackgroundResource(R.drawable.button_background_dark);
        highButton.setBackgroundResource(R.drawable.button_background);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.register_button:
                if (isValidPhoneNumber(phoneEditText.getText())) {

                    final ProgressDialog progressDialog = new ProgressDialog(MainActivity.this,
                            R.style.AppTheme_Dark_Dialog);
                    progressDialog.setIndeterminate(true);
                    progressDialog.setMessage(getString(R.string.registration_in_progress));
                    progressDialog.show();

                    RegistrationRequest registrationRequest = new RegistrationRequest();
                    registrationRequest.setId(deviceIdEditText.getText().toString());
                    registrationRequest.setNotify(phoneEditText.getText().toString());
                    registrationRequest.setMessage(msgEditText.getText().toString());
                    registrationRequest.setThreshold(threshold);

                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl(getString(R.string.base_url))
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    RegistrationService registrationService = retrofit.create(RegistrationService.class);
                    Call<ResponseModel> registrationCall = registrationService.register(registrationRequest);

                    registrationCall.enqueue(new Callback<ResponseModel>() {
                        @Override
                        public void onResponse(Call<ResponseModel> call, Response<ResponseModel> response) {

                            progressDialog.dismiss();
                            Toast.makeText(MainActivity.this, getString(R.string.registration_sucessful), Toast.LENGTH_LONG).show();

                        }

                        @Override
                        public void onFailure(Call<ResponseModel> call, Throwable t) {

                            progressDialog.dismiss();
                            Toast.makeText(MainActivity.this, getString(R.string.something_went_wrong), Toast.LENGTH_LONG).show();

                        }
                    });

                } else {
                    Toast.makeText(MainActivity.this, getString(R.string.invalid_phone), Toast.LENGTH_LONG).show();
                }

                break;
            case R.id.low_button:
                threshold = LOW;
                lowButton.setBackgroundResource(R.drawable.button_background_dark);
                highButton.setBackgroundResource(R.drawable.button_background);

                break;

            case R.id.high_button:
                threshold = HIGH;
                highButton.setBackgroundResource(R.drawable.button_background_dark);
                lowButton.setBackgroundResource(R.drawable.button_background);

                break;

        }
    }
}


