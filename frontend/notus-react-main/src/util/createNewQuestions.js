var axios = require('axios');
export async function createNewQuestionsCallback(questionTitle, description, option1, option2, option3, option4) {
    const questionData = {
        "title" : questionTitle,
        //"description" : description,
        "options" : [option1,option2,option3,option4]

    }
    var data = JSON.stringify({
        questionData
    });

    const res = await axios.post("http://localhost:3000/dev/create-mcq-question",data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    console.log(res);
}