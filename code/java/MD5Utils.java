import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * author  BalanFish
 * date  2020/6/7 9:43
 * version 1.0
 */
public class MD5Utils {
    private static final String slat = "&%5123***&&%%$$#@";
    public static String encrypt(String dataStr) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        try {
            dataStr = dataStr + slat;
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(dataStr.getBytes("UTF8"));
            byte s[] = m.digest();
            String result = "";
            for (int i = 0; i < s.length; i++) {
                result += Integer.toHexString((0x000000FF & s[i]) | 0xFFFFFF00).substring(6);
            }
            return result;
        } catch (Exception e) {
            throw e;
        }
    }
}
