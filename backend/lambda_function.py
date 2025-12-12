#  お金がかかるので、lambdaはまだ使わない
import json

def lambda_handler(event, context):
    
    print("Pythonバックエンドが呼び出されました")

    response_body = {
        "message" : "Hello from Python Backend!",
        "status"  : "success"
    }

    # API Gateway用のレスポンス
    return {
        "statusCode" : 200,
        "headers" : {
            "Content-Type": "application/json" ,
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(response_body, ensure_ascii=False)
    }