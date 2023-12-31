import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert, Divider, message, Space, Tabs} from 'antd';
import React, {useState} from 'react';
import {ProFormCheckbox, ProFormText, LoginForm} from '@ant-design/pro-components';
import {history, useModel} from 'umi';
import {SYSTEM_LOGO} from '@/constants';
import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import styles from './index.less';
import { Link } from '@umijs/max';

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({...s, currentUser: userInfo}));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({...values, type});

      if (user) {
        const defaultLoginSuccessMessage = 'Login Success!';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="User Center"
          subTitle={'Welcome'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams); // 提交后端
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码登录'}/>
          </Tabs>
          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的账号和密码'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount" // 传给后端接收的字段
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="userAccount"
                rules={[
                  {
                    required: true,
                    message: 'userAccount is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="useruserPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="userPassword"
                rules={[
                  {
                    required: true,
                    message: 'userPassword is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'length at least 8',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <Link to="/user/register">新用户注册</Link>
              <a
                style={{
                  float: 'right',
                }}
                // href={PLANET_LINK}
                target="_blank"
                rel="noreferrer"
              >
                忘记密码
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
