import 'dotenv/config';

import { randomUUID } from 'crypto';

import { describe, expect, it } from '@jest/globals';
import { ethers } from 'ethers';
import request from 'supertest';

import { app } from '../src';
import aes from '../src/libs/aes';

describe('user', () => {
  const tempAuth = {
    data: 'a446fb8d-e56b-46bc-8d53-02f6e0215ab3',
    sign: '0x124fd8af9890228d23ffcd29c2566fd29f511c6855b41ef57b5f68f7114a5bc105d48848850f4bd0898541325f62d3cbe121c1b55cbdf73ae0ef7c98428e478e1c',
    address: '0x850F5aaaFC651EE0095b9733EE9d6Eb2Fc6f64F9',
  };

  it('registe or login user', async () => {
    const wallet = ethers.Wallet.createRandom();
    const data = randomUUID();
    const signed = await wallet.signMessage(data);
    console.log({
      sign: signed,
      data: data,
      address: wallet.address,
    });

    const resp = await request(app).post('/api/user/registe').send({
      sign: signed,
      data: data,
      address: wallet.address,
    });
    expect(resp.status).toBe(200);
  });

  it('currentUser', async () => {
    const resp = await request(app)
      .post('/api/user/currentUser')
      .set('address', tempAuth.address)
      .set('data', tempAuth.data)
      .set('sign', tempAuth.sign);
    console.log(resp.body);

    expect(resp.status).toBe(200);
  });

  it('updateProfile', async () => {
    const reqParam = {
      sign: '个性签名',
      username: `${tempAuth.address}的用2户名`,
      nickname: `${tempAuth.address}的昵称`,
      mobile: '1311313131',
      email: `${tempAuth.address}@gmail.com`,
    };
    const resp = await request(app)
      .post('/api/user/update-profile')
      .send(reqParam)
      .set('address', tempAuth.address)
      .set('data', tempAuth.data)
      .set('sign', tempAuth.sign);
    console.log(resp.body);
    expect(resp.status).toBe(200);
  });

  it('使用token 登录', async () => {
    const sysResponse = await request(app).post('/api/sys/sysPubKey');
    const sysData = sysResponse.body.data;
    const tempWallet = ethers.Wallet.createRandom();
    const sharedSecret = tempWallet.signingKey.computeSharedSecret(sysData.pubKey);
    const data = {
      data: tempAuth.data,
      sign: tempAuth.sign,
    };
    const result = aes.En(JSON.stringify(data), sharedSecret);
    const token = `${result}_${tempWallet.signingKey.publicKey}`;

    const loginResp = await request(app).post('/api/user/loginByKeyword').send({ token });
    console.log(loginResp.body);
    expect(loginResp.status).toBe(200);
  });
});
