var fs=require("fs")
const user=require("readline-sync")
const axios=require("axios")
axios.get("https://api.merakilearn.org/courses")
.then(res=>{
    meraki_data=res.data
    file=JSON.stringify(meraki_data,null,3)
    a=fs.writeFileSync("course.json",file)
    s_no=0 
    for(course_data of meraki_data){
        console.log(s_no+1,course_data['name'],course_data['id']);
        s_no++;
    }
    
    let user_input=user.questionInt("enter the course id")
    console.log(meraki_data[user_input-1]['name']);
    let data1=(meraki_data[user_input-1]['id'])
    axios.get("https://api.merakilearn.org/courses/"+data1+"/exercises")
    .then(res=>{
        meraki_data1=res.data
        file1=JSON.stringify(meraki_data1,null,4)
        b=fs.writeFileSync("course1.json",file1)
        store=meraki_data1['course']['exercises']
        console.log(store);
        no=0
        for(info in store){
        console.log(no+1,store[info]['name']);
        no++;
        // console.log(meraki_data);
        }
        const ques=user.questionInt('enter the question')
        let slug=store[ques]['content']
        console.log(slug);

    }).catch((syntax)=>{
        console.log(syntax);
    })


}).catch((error)=>{
    console.log(error);
})
