const API_KEY = "AIzaSyBPjgiuW8VPMX4RAJfRSgo7LBSdjo3YLjI";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const banner = `
        __          __             __ __      
 .---.-|  |--.---.-|  |--.---.-.--|  |__.----.
 |  _  |    <|  _  |    <|  _  |  _  |  |   _|
 |___._|__|__|___._|__|__|___._|_____|__|__|  
                                                                                           
Chatbot v1.7 - https://akakadir.github.io
`;

var term = $('#terminal').terminal(async function(command, term) {
    var cmd = $.terminal.parse_command(command);

    if (cmd.name === 'exit') {
        $('.tv').addClass('collapse');
        term.disable();
    } else if (command !== '') {
        try {
            term.pause();
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: command }]
                    }]
                })
            });
            const data = await response.json();
            const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (result) {
                term.echo("\n" + "chatbot> " + result.trim() + "\n");
            } else {
                term.error("yapay-zeka boş bir yanıt döndürdü.");
            }
        } catch (e) {
            term.error(`api hatası: ${e.message}`);
        } finally {
            term.resume();
        }
    }
}, {
    name: 'js_demo',
    prompt: 'root> ',
    greetings: '',
    onInit: function() {
        this.echo(banner);
    }
});

function set_size() {
    var height = $(window).height();
    var width = $(window).width();
    $('.scanlines')[0].style.setProperty("--time", (height * 2) / 170);
    $('.tv')[0].style.setProperty("--width", width);
    $('.tv')[0].style.setProperty("--height", height);
}
