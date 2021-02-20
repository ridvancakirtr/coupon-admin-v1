import Vue from 'vue'
let vueThis = new Vue();

const notify = (title,text,color) => {
    vueThis.$vs.notify(
        {
            title: title,
            text: text, color: color,
            position: 'top-right'
        }
    );
}

export default {
    notify
}



