import { GithubOutlined } from '@ant-design/icons';
import { LinkedinFilled } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'Hongbo Produced';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'website',
          title: 'Portfolio',
          href: 'https://hongbohu.com',
          blankTarget: true, //是否打开新页面
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/HumbleHu',
          blankTarget: true,
        },
        {
          key: 'linkedin',
          title: <LinkedinFilled />,
          href: 'https://www.linkedin.com/in/hongbo-hu',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
