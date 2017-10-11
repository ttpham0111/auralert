package cmpe297.sjsu.edu.auralertandroidapp.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nilamdeka on 10/10/17.
 */

public class RegistrationRequest {

    private String id;
    private int threshold;
    private String notify;
    private String message;
    private int cooldown;

    @SerializedName("last_notify_time")
    @Expose
    private int lastNotifyTime;

    public RegistrationRequest(){}

    public RegistrationRequest(String id, int threshold, String notify, String message){
        this.id = id;
        this.threshold = threshold;
        this.notify = notify;
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    public String getNotify() {
        return notify;
    }

    public void setNotify(String notify) {
        this.notify = notify;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCooldown() {
        return cooldown;
    }

    public void setCooldown(int cooldown) {
        this.cooldown = cooldown;
    }

    public int getLastNotifyTime() {
        return lastNotifyTime;
    }

    public void setLastNotifyTime(int lastNotifyTime) {
        this.lastNotifyTime = lastNotifyTime;
    }

}
