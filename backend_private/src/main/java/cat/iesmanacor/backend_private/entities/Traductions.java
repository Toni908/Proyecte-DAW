package cat.iesmanacor.backend_private.entities;

import cat.iesmanacor.backend_private.configuration.MvnConfiguration;
import lombok.Data;

import javax.servlet.http.HttpServletRequest;

@Data
public class Traductions {

    String spain;
    String english;
    String catala;

    public Traductions(String spain, String english, String catala) {
        this.spain = spain;
        this.english = english;
        this.catala = catala;
    }

    public String getSpain() {
        return spain;
    }

    public void setSpain(String spain) {
        this.spain = spain;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getCatala() {
        return catala;
    }

    public void setCatala(String catala) {
        this.catala = catala;
    }

    public String getTraductionLocale(HttpServletRequest request) {
        MvnConfiguration mvnConfiguration = new MvnConfiguration();
        String lang = String.valueOf(mvnConfiguration.localeResolver().resolveLocale(request));
        if (lang.equals("es")) {
            return this.spain;
        } else if (lang.equals("en")) {
            return this.english;
        } else {
            return this.catala;
        }
    }

    public String getTraduction() {
        MvnConfiguration mvnConfiguration = new MvnConfiguration();
        String lang = String.valueOf(mvnConfiguration.localeResolver());
        if (lang.equals("es")) {
            return this.spain;
        } else if (lang.equals("en")) {
            return this.english;
        } else {
            return this.catala;
        }
    }
}
