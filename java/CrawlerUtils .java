package utils;

import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * author  BalanFish
 * date  2020/6/9 9:46
 * version 1.0
 */
public class CrawlerUtils {
    public static Document getDoc(String url,String charset) throws IOException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(60000)
                .setConnectionRequestTimeout(60000)
                .setSocketTimeout(60000)
                .build();
        HttpGet httpGet = new HttpGet(url);
        httpGet.setConfig(config);

        CloseableHttpResponse response = null;
        try {
            //执行httpGet请求
            response = httpClient.execute(httpGet);
            System.out.println(response.getStatusLine().getStatusCode());

            //获取响应实体
            HttpEntity httpEntity = response.getEntity();

            BufferedReader in = new BufferedReader(new InputStreamReader(response.getEntity()
                    .getContent(),charset));
            StringBuffer sb = new StringBuffer("");
            String line = "";
            while ((line = in.readLine()) != null) {
                sb.append(line);
            }
            in.close();
            return Jsoup.parse(sb.toString());
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                response.close();
                httpClient.close();
            } catch (IOException e) {
                throw e;
            }
        }
    }
}
/** pom.xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.5.2</version>
</dependency>
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.13.1</version>
</dependency>
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpcore</artifactId>
    <version>4.4.9</version>
</dependency>
 */