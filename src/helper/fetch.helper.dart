import 'dart:async'; 
import 'dart:convert'; 
import 'package:http/http.dart' as http;

final fetchGET(final url, var headers, var query) async {
    var finalUrl = url;
    if (query != "") {
        finalUrl = Uri.parse(url + '?' + query);
    }
    var response = await http.get(
        finalUrl,
        headers
    );
    var resStatus = response.statusCode;
    List code = [200, 201, 302];
    var resData = convert.jsonDecode(response.body);
    if(code.contains(resStatus)) {
        return {
            message: resData.message,
            data: resData.data,
            success: true
        }
    } else {
        return {
            message: resData.message,
            success: false
        }
    }
}

final fetchPOST(final url, var headers, var body) async {
    var finalUrl = url;
    var response = await http.post(
        finalUrl,
        headers,
        body
    );
    var resStatus = response.statusCode;
    List code = [200, 201, 302];
    var resData = convert.jsonDecode(response.body);
    if(code.contains(resStatus)) {
        return {
            message: resData.message,
            data: resData.data,
            success: true
        }
    } else {
        return {
            message: resData.message,
            success: false
        }
    }
}