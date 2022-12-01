
import json
from flask import Flask, render_template, request
import check



app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/s1', methods=['POST', 'GET'])
def s_1():
    inp = request.get_json()
    res = json.loads(inp)
    zw = res['char']
    count = res['len']
    ret_res = check.check(zw, count)
    result = {'char': ret_res}
    end = json.dumps(result)
    check.reset(count)

    return end



if __name__ == '__main__':
    app.run(debug=True, threaded=True)
