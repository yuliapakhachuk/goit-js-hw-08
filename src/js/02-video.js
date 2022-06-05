import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle( function getCurrentMoment(e) {
    const allSeconds = [];
    allSeconds.push(e.seconds);

    const lastSecond = allSeconds[allSeconds.length - 1];
    
    localStorage.setItem(LOCALSTORAGE_KEY, `${lastSecond}`);
    }, 1000)
);

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY))
    .then(function (seconds) {
    // seconds = the actual time that the player seeked to
        }).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    // the time was less than 0 or greater than the video’s duration
                    break;

                default:
                    // some other error occurred
                    break;
        }
    }
);
