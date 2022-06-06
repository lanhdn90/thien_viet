import * as React from 'react';
import FormLogin from '../components/FormLogin/FormLogin';
import style from './Login.module.scss'
export interface  LoginProps {
}

export default function Login (props:  LoginProps) {
  return (
    <div className={style.root}>
      <div className={style.content}>
        <div className={style.image_company}></div>
        <div className={style.logo_title}>VIESKY</div>
        <FormLogin />
      </div>
    </div>
  );
}
