import cv2
import smtplib
from email.mime.text import MIMEText

# -----------------------------
# EMAIL CONFIGURATION
# -----------------------------

sender_email = "parajapativivek277@gmail.com"

# Gmail App Password
app_password = "rxmcwbsgpkwvbncv"

receiver_email = "rssingh0246@gmail.com"

# -----------------------------
# LOAD FACE RECOGNIZER
# -----------------------------

recognizer = cv2.face.LBPHFaceRecognizer_create()

recognizer.read('trainer/trainer.yml')

# -----------------------------
# LOAD HAARCASCADE
# -----------------------------

faceCascade = cv2.CascadeClassifier(
    'haarcascade_frontalface_default.xml'
)

# -----------------------------
# FONT STYLE
# -----------------------------

font = cv2.FONT_HERSHEY_SIMPLEX

# -----------------------------
# NAMES LIST
# ID MUST MATCH DATASET ID
# -----------------------------

names = [
    '',
    'Rakesh singh',
    'Vinayak',
    'Garv Goal',
    'Rakesh ',
    'Gourav',
    'Dr. Shefali Dhingra',
    'Dr. Deepti Choudhary',
    'Madhur Goal',
    'Puru Sharma',
    'Dr. Shikha bhardwaj',
    'rakesh',
    'Dr. Priyanka jangra',
    'vishal'
]

# -----------------------------
# START WEBCAM
# -----------------------------

cam = cv2.VideoCapture(0)

print("Face Recognition Started")

# -----------------------------
# STORE EMAIL SENT PERSONS
# -----------------------------

sent_names = []

# -----------------------------
# MAIN LOOP
# -----------------------------

while True:

    # Read webcam frame
    ret, img = cam.read()

    # Convert image to grayscale
    gray = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    # Detect faces
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=5
    )

    # Loop through detected faces
    for (x, y, w, h) in faces:

        # Draw rectangle around face
        cv2.rectangle(
            img,
            (x, y),
            (x + w, y + h),
            (0, 255, 0),
            2
        )

        # Predict face
        id, confidence = recognizer.predict(
            gray[y:y+h, x:x+w]
        )

        #print("Confidence:", confidence)

        # Check recognition confidence
        if confidence < 100:

            # Check valid ID
            if id < len(names):

                name = names[id]

            else:

                name = "Unknown"

            # Convert confidence to percentage
            confidence_text = "{0}%".format(
                round(100 - confidence)
            )

            # Send email only once per person
            if name not in sent_names:

                try:

                    # Email subject
                    subject = "Face Recognition Alert"

                    # Email body
                    body = f"""Student {name} recognized successfully.

                    Confidence:{confidence_text}
                     """

                    # Create message
                    msg = MIMEText(body)

                    msg['Subject'] = subject
                    msg['From'] = sender_email
                    msg['To'] = receiver_email

                    print("Sending email to Teacher...")

                    # Connect Gmail SMTP server
                    server = smtplib.SMTP(
                        'smtp.gmail.com',
                        587
                    )

                    # Start secure connection
                    server.starttls()

                    # Login Gmail
                    server.login(
                        sender_email,
                        app_password
                    )

                    # Send email
                    server.sendmail(
                        sender_email,
                        receiver_email,
                        msg.as_string()
                    )

                    # Disconnect server
                    server.quit()

                    print("Email Sent Successfully")

                    # Add person to sent list
                    sent_names.append(name)

                except Exception as e:

                    print("Error Sending Email")
                    print(e)

        else:

            # Unknown person
            name = "Unknown"
            confidence_text = "Low Confidence"

        # Display recognized name
        cv2.putText(
            img,
            str(name),
            (x + 5, y - 5),
            font,
            1,
            (0, 0, 255),
            2
        )

        # Display confidence
        cv2.putText(
            img,
            str(confidence_text),
            (x + 5, y + h - 5),
            font,
            1,
            (255, 255, 0),
            1
        )

    # Show webcam window
    cv2.imshow(
        'Face Recognition',
        img
    )

    # Press ESC to exit
    k = cv2.waitKey(10) & 0xff

    if k == 27:
        break

# -----------------------------
# RELEASE WEBCAM
# -----------------------------

cam.release()

# -----------------------------
# CLOSE WINDOWS
# -----------------------------

cv2.destroyAllWindows()