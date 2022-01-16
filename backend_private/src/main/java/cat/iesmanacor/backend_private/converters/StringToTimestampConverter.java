package cat.iesmanacor.backend_private.converters;

import org.springframework.core.convert.converter.Converter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class StringToTimestampConverter implements Converter<String, Timestamp> {

    @Override
    public Timestamp convert(String strDate) {
        strDate = strDate.replace("T"," ");
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return Optional.of(strDate) //
                .map(str -> LocalDateTime.parse(str, formatter))
                .map(Timestamp::valueOf) //
                .orElse(null);
    }
}
