from flask import Flask, render_template, request
import requests
import base64

app = Flask(__name__)

url_prediction_url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/1f25ab99-e2de-4a3e-9faa-948295270b9b/classify/iterations/Iteration1/url"
url_prediction_key = "7ea404029b0645f69ca1ae75d1d3b7b9"

file_prediction_url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/1f25ab99-e2de-4a3e-9faa-948295270b9b/classify/iterations/Iteration1/image"
file_prediction_key ="7ea404029b0645f69ca1ae75d1d3b7b9"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'image' in request.files:
            file = request.files['image']
            if file:
                image_bytes = file.read()
                headers = {
                    'Prediction-Key': file_prediction_key,
                    'Content-Type': 'application/octet-stream'
                }
                response = requests.post(file_prediction_url, headers=headers, data=image_bytes)
                response.raise_for_status()
                prediction = response.json()
                predictions = prediction['predictions']
            if predictions:
                top_prediction = predictions[0]
                tag_name = top_prediction['tagName']
                probability = top_prediction['probability']

                if probability >= 0.9:  # Check if accuracy is above 70%
                    return render_template('result.html', tag_name=tag_name)
                else:
                    return render_template('result.html', tag_name='This image in not a valid image please provide the A valid skin image.')
            else:
                return render_template('result.html', tag_name='No predictions found.')

        elif 'image' in request.form:  # Handle camera-captured image
            img_data = request.form['image']
            if img_data:
                headers = {
                    'Prediction-Key': file_prediction_key,
                    'Content-Type': 'application/octet-stream'
                }
                image_bytes = base64.b64decode(img_data.split(',')[1])  # Convert base64 to bytes
                response = requests.post(file_prediction_url, headers=headers, data=image_bytes)
                response.raise_for_status()
                prediction = response.json()
                predictions = prediction['predictions']
                if predictions:
                    tag_name = predictions[0]['tagName']
                    return render_template('result.html', tag_name=tag_name)
                else:
                    return render_template('result.html', tag_name='No predictions found.')
            else:
                return render_template('result.html', tag_name='No image captured.')
        elif 'img_url' in request.form:
            img_url = request.form['img_url']
            headers = {
                'Prediction-Key': url_prediction_key,
                'Content-Type': 'application/json'
            }
            data = {
                'url': img_url
            }
            response = requests.post(url_prediction_url, headers=headers, json=data)
            response.raise_for_status()
            prediction = response.json()
            predictions = prediction['predictions']
            if predictions:
                tag_name = predictions[0]['tagName']
                return render_template('result.html', tag_name=tag_name)
            else:
                return render_template('result.html', tag_name='No predictions found.')
        else:
            return render_template('result.html', tag_name='No input provided.')
    except Exception as e:
        app.logger.error(f"An error occurred during image analysis: {e}")
        return render_template('result.html', tag_name='Error during image analysis.')

if __name__ == '__main__':
    app.run(debug=True)