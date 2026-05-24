import cv2
import numpy as np
from PIL import Image
import os

# Path of dataset folder
path = 'dataset'

# Create LBPH Face Recognizer
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Load Haar Cascade face detector
detector = cv2.CascadeClassifier(
    "haarcascade_frontalface_default.xml"
)

# Function to get images and labels
def getImagesAndLabels(path):

    # Get all image paths from dataset folder
    imagePaths = [os.path.join(path, f)
                  for f in os.listdir(path)]

    # Lists for face samples and IDs
    faceSamples = []
    ids = []

    # Loop through all images
    for imagePath in imagePaths:

        # Open image and convert to grayscale
        PIL_img = Image.open(imagePath).convert('L')

        # Convert image to numpy array
        img_numpy = np.array(PIL_img, 'uint8')

        # Extract ID from filename
        # Example: user.1.5.jpg → ID = 1
        id = int(os.path.split(imagePath)[-1].split(".")[1])

        # Detect face in image
        faces = detector.detectMultiScale(img_numpy)

        # Extract face area and store it
        for (x, y, w, h) in faces:

            faceSamples.append(
                img_numpy[y:y+h, x:x+w]
            )

            ids.append(id)

    # Return face samples and IDs
    return faceSamples, ids


print("Training faces. Please wait...")

# Load images and labels
faces, ids = getImagesAndLabels(path)

# Train recognizer
recognizer.train(faces, np.array(ids))

# Create trainer folder if not exists
if not os.path.exists('trainer'):
    os.makedirs('trainer')

# Save trained model
recognizer.save('trainer/trainer.yml')

print("Model Trained Successfully")