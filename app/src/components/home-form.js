import React,{Component} from 'react';

export default class HomeForm extends Component{
  render(){
    return(
      <div className={'app-card'}>
        <form >
          <div className={'app-card-header'}>
            <div className={'app-card-header-inner'}>
              <div className={'app-file-select-zone'}>
              <label className={"label1"} htmlFor={'inputfile'}>
                <input className={"input1"} id={'input-file'} type='file' multiple={true} />
                <span className={'app-upload-icon'} />
                <span className={'app-upload-description'}>Drag and drop your files here.</span>
              </label>
            </div>

            </div>
          </div>
          <div className={'app-card-content'}>
            <div className={'app-card-content-inner'}>
              <div className={'app-form-item'}>
                <label className={"label2"} htmlFor={'to'}>Send to</label>
                <input className={"input2"} name={'to'} placeholder={'Email adress'} type={'text'} id={'to'} />
              </div>

              <div className={'app-form-item'}>
                <label className={"label3"} htmlFor={'from'}>From</label>
                <input className={"input3"} name={'from'} placeholder={'Your email adress'} type={'text'} id={'from'} />
              </div>

              <div className={'app-form-item'}>
                <label className={"label4"} htmlFor={'message'}>Message</label>
                <textarea className={"textarea1"} id={'message'} placeholder={'Add a note (optional)'} name={'message'}/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
