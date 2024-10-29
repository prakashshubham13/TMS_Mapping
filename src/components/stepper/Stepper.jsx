import React, { useEffect, useRef, useState } from "react";
import styles from "./stepper.module.css";
import Preview from "../preview/Preview";
// const config = [
//   { name: "Upload", component: <h1>Upload</h1> },
//   { name: "Map", component: <h1>Map</h1> },
//   { name: "df", component: <h1>wew</h1> },
//   { name: "edw", component: <h1>we</h1> },
// ];

const Stepper = ({config}) => {
  
  const [currentStep, setCurretStep] = useState(1);
  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (config.length - 1)) * 100;
  };
  const stepRef = useRef([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  useEffect(() => {
    if(config.length<=1) return;
    console.log(stepRef.current[0].offsetWidth);
    
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[config.length - 1].offsetWidth / 2,
    });
  }, [stepRef, config.length]);

console.log("stepper--------->>>>>>>>>>>>>>",config,currentStep,config[currentStep - 1]);

  return (
    <>

    {
      config.length > 0 &&
      <div className={styles.stepperContainer}>
        <div className={styles.stepperHeader} style={{justifyContent:config.length === 1 ? 'center' : 'space-between'}}>
          {config.length > 0 &&
            config.map((step, index) => (
              <div
                className={styles.steps}
                ref={(el)=>stepRef.current[index] = el}
                onClick={() => setCurretStep(index + 1)}
                
              >
                <div className={styles.stepNumber} style={{fontWeight:'900',border: index <= currentStep - 1 ? '0.2rem solid #28a745' : '#fff', background: index === currentStep - 1 ? '#28a745' : '#fff',color: index === currentStep - 1 ? '#fff' : '#000'}}>{index + 1}</div>
                {/* <div className={styles.stepName}>{index}</div> */}
              </div>
            ))}
          <div className={styles.progressBar}  style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}>
            <div className={styles.progress} 
            style={{ width: `${calculateProgressBarWidth()}%` }}
            ></div>
          </div>
        </div>
      </div>
}

      <div className="stepperBody">
        {config?.[currentStep - 1] && <Preview data={config[currentStep - 1]} index={currentStep - 1}/>}
      </div>
    </>
  );
};

export default Stepper;
