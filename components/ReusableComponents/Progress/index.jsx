import React from 'react';
import styled from 'styled-components';

// Styled Components

// Main React Component
const VerticalProgressTracker = () => {
  return (
    <>
      <Parent>
        <ParentHeader>Active request progress</ParentHeader>
        <ParentStepper>
          <div class="rt-container">
            <div class="col-rt-12">
              <div class="Scriptcontent">
                <div class="step">
                  <div>
                    <div class="circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.32923 13.2307L3.85423 9.75573L2.6709 10.9307L7.32923 15.5891L17.3292 5.58906L16.1542 4.41406L7.32923 13.2307Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div class="title">Request sent</div>
                    <div class="caption">Jun. 25 2021</div>
                  </div>
                </div>
                <div class="step ">
                  <div>
                    <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.32923 13.2307L3.85423 9.75573L2.6709 10.9307L7.32923 15.5891L17.3292 5.58906L16.1542 4.41406L7.32923 13.2307Z" fill="white" />
                    </svg></div>
                  </div>
                  <div>
                    <div class="title">
                      Request received by registration body
                    </div>
                    <div class="caption">Jun. 27 2021</div>
                  </div>
                </div>
                <div class="step step-active">
                  <div>
                    <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.32923 13.2307L3.85423 9.75573L2.6709 10.9307L7.32923 15.5891L17.3292 5.58906L16.1542 4.41406L7.32923 13.2307Z" fill="white" />
                    </svg></div>
                  </div>
                  <div>
                    <div class="title">Registration started</div>
                  </div>
                </div>

                <div class="step">
                  <div>
                    <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.32923 13.2307L3.85423 9.75573L2.6709 10.9307L7.32923 15.5891L17.3292 5.58906L16.1542 4.41406L7.32923 13.2307Z" fill="white" />
                    </svg></div>
                  </div>
                  <div>
                    <div class="title">Registration completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ParentStepper>
      </Parent>
    </>
  );
};

// Set the theme for the styled-components

export default VerticalProgressTracker;
const ParentStepper = styled.section`
  /* border-left: 1px dashed #979797; */
`
const Parent = styled.section`
    rt {
        position: relative;
    }
    .step {
        position: relative;
        min-height: 1em;
        display: flex;
        align-items: flex-start;
    }
    .step + .step {
        margin-top: 40px;
    }
    .step > div:first-child {
        position: static;
        height: 0;
    }
    .step > div:not(:first-child) {
        margin-left: 1.5em;
    }
    .step.step-active {
        color: #4285f4;
    }
    .step.step-active .title {
        background-color: #6CCF00;
    }

    /* Circle */
    .circle {
        background: #6ccf00;
        position: relative !important;
        width: 32px;
        height: 32px;
        line-height: 1.5em;
        border-radius: 100%;
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* Vertical Line */
    .circle:after {
        content: ' ' !important;
        position: absolute;
        display: block;
        top: 1px;
        right: 50%;
        bottom: 1px;
        left: 50%;
        height: 100%;
        width: 1px;
        /* transform: scale(1, 2);
        transform-origin: 50% -100%; */
        background-color: #979797 !important;
        z-index: -1;
    }
    .step:last-child .circle:after {
        display: none;
    }

    /* Stepper Titles */
    .title {
        line-height: 1.5em;
        font-weight: bold;
        border-radius: 5px;
        background: #7a7978;
        display: flex;
        padding: 4px 12px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        color: #fff;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        width: fit-content;
    }
    .caption {
        color: #696969;

        font-family: Inter;
        font-size: 12px;
        font-style: italic;
        font-weight: 500;
        line-height: normal;
    }
`;
const ParentHeader = styled.section`
color: #2B4551;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom:16px;
`