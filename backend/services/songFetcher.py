from ytmusicapi import YTMusic
import json
# import pafy
# https://pypi.org/project/pafy/

url = input()

yt = YTMusic()
try:
    songs = yt.get_playlist(url, limit=30) # limit not working, might have to get latest release of api?
    songs = json.dumps(songs) # reason for bug was because I didn't convert dictionary to json :facepalm:
    print(songs)
except Exception as e:
    print("Error:", e)
    



