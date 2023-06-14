import React, { useState, useSyncExternalStore } from 'react'
import styles from "./skills.module.css";

const Skills = (Props) => {
  let {data,resumeData,setResumeData} = Props; 
  const [idExp,setIdExp] = useState(1);
  const [editHappen,setEditHappen] = useState(false);
  const [allData,setAllData] = useState({
    id : 0,
    skill : "",
    years : "",
  });

  
  const getAllBasicData = (e) => {
    e.preventDefault();
    if(editHappen){
      data = data.filter(el=>(
        el.id !== allData.id
      ));
      setEditHappen(!editHappen);
    }else{
      setIdExp((prev)=>prev+1);
    }
    setResumeData({...resumeData,Skills:[...data,allData]});
    setAllData({
      id : idExp,
      skill : "",
      years : "",
    });
  }

  const editExperience  = (el) => {
    setAllData(el);
    setEditHappen(!editHappen);
  }

  const deleteExperience = (id) => {
     let filtArr = data.filter(el=>(
      el.id !== id
     ))
     setResumeData({...resumeData,Skills:[...filtArr]})
  }

  return (
    <div className={styles.basic_main_container}>
     <div className={styles.Experience_heading} >Skills</div>
     <div className={styles.Experience_already_present_main_div}>{data.length>0 && data?.map((el,i)=>{
       return (
        <div className={styles.Experience_already_present_data} key={i}>
           <div>
             <div>Skill : {el.skill}</div>
           </div>
           <div>
             <div>Years of Practice : {el.years}</div>
           </div>
           <div>
            <i onClick={()=>editExperience(el)} className="uil uil-edit"></i>
            <i onClick={()=>deleteExperience(el.id)} className="uil uil-times"></i>
            </div>
        </div>
       ) 
     })}</div>
     <form onSubmit={getAllBasicData}>
       <div>
        <label for={"skill"} >Skill</label>
        <input id='skill' type='text' placeholder='Enter your Skill here' value={allData.skill} onChange={(e)=>{setAllData({...allData,skill:e.target.value})}} required/>
       </div>
       <div>
        <label for={"years"} >Years of Practice</label>
        <input id='years' type='number' placeholder='Enter years of practice here' value={allData.years} onChange={(e)=>{setAllData({...allData,years:e.target.value})}} required/>
       </div>
       <input id={styles.submitButton} type='submit' value={"Save"} />
     </form>
    </div>
  )
}

export default Skills;