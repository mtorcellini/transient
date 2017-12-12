# [Transient](https://transient-composer.herokuapp.com)
## Procedurally Composed Machine Music
----

#### Using [Pizzicato.js](https://github.com/alemangui/pizzicato), Transient composes and plays programmatically "okay" music - indefinitely.

* Transient uses four part voice writing, along with a "kick" and a "clap" to create music that winds randomly but never out of key or out of time

* Transient plays at 60 bpm (or one beat per second), and uses C Major for simplicity, although the ability to use different scales and even modulation is possible with little change.

* Notes in each voice are composed "just in time" meaning they are not predetermined, but instead are composed just before they are about to be played, along with the duration of the note.

* At this time, subsequent notes and duration are determined randomly within a given range but there is potential for some basic machine learning to help create musical patterns and better-follow basic music theory.

* There are also plans to allow user interaction to change values such as key, the range of octaves availabe to each voice, custom keys, variable tempo and more. 

* In protoyping, I created a means for the notes to be displayed on the page as they were played, but I removed them for now until I could come up with a way for it to be saved or exportable into a useable music file format.