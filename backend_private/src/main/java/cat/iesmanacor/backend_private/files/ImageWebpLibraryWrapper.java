package cat.iesmanacor.backend_private.files;

import java.io.*;
import java.util.concurrent.TimeUnit;

public class ImageWebpLibraryWrapper {
    private static final String CWEBP_BIN_PATH = "somepath/libwebp-1.1.0-linux-x86-64/bin/cwebp";

    public static boolean isWebPAvailable() {
        if ( CWEBP_BIN_PATH == null ) {
            return false;
        }
        return new File( CWEBP_BIN_PATH ).exists();
    }

    public static boolean convertToWebP( File imageFile, File targetFile, int quality ) {
        Process process;
        try {
            process = new ProcessBuilder( CWEBP_BIN_PATH, "-q", "" + quality, imageFile.getAbsolutePath(), "-o",
                    targetFile.getAbsolutePath() ).start();
            process.waitFor( 10, TimeUnit.SECONDS );
            if ( process.exitValue() == 0 ) {
                // Success
                printProcessOutput( process.getInputStream(), System.out );
                return true;
            } else {
                printProcessOutput( process.getErrorStream(), System.err );
                return false;
            }
        } catch ( Exception e ) {
            e.printStackTrace();
            return false;
        }
    }

    private static void printProcessOutput(InputStream inputStream, PrintStream output ) throws IOException {
        try (InputStreamReader isr = new InputStreamReader( inputStream );
             BufferedReader bufferedReader = new BufferedReader( isr ) ) {
            String line;
            while ( ( line = bufferedReader.readLine() ) != null ) {
                output.println( line );
            }
        }
    }
}
