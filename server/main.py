from flask import Flask, request
from flask_cors import CORS
from flask import render_template
from fastai.vision.all import *
from fastai.learner import load_learner
from pathlib import Path
from pathlib import PureWindowsPath
import pickle
import joblib
import torch
import pathlib


temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath
# Labeling function required for load_learner to work


def GetLabel(fileName):
    fileName = fileName.split(".")[0]
    for img in get_image_files("data/handwatch"):
        if fileName in str(img):
            return "handwatch"
    return "alarmclock"


modelPath = get_files('../server', '.pkl')[0]
learn = load_learner(modelPath)

app = Flask(__name__)
cors = CORS(app)  # Request will get blocked otherwise on Localhost


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    img = PILImage.create(request.files['file'])
    label, _, probs = learn.predict(img)
    return f'{label}'


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
