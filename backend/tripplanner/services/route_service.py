import os
import requests

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("ORS_API_KEY")

def get_route(start, end):

    url = "https://api.openrouteservice.org/v2/directions/driving-car"

    headers = {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
    }

    body = {
        "coordinates": [
            start,
            end
        ]
    }

    response = requests.post(
        url,
        json=body,
        headers=headers
    )

    return response.json()