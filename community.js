/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

export const community = () => {
    performance.mark("communityStart")
    const firstUserImg = document.querySelector('.first-user__img');
    const firstUserP = document.querySelector('.first-user__p');
    const firstUserUsername = document.querySelector('.first-user__username');
    const firstUserPosition = document.querySelector('.first-user__position');
  
    const secondUserImg = document.querySelector('.second-user__img');
    const secondUserP = document.querySelector('.second-user__p');
    const secondUserUsername = document.querySelector('.second-user__username');
    const secondUserPosition = document.querySelector('.second-user__position');
  
    const thirdUserImg = document.querySelector('.third-user__img');
    const thirdUserP = document.querySelector('.third-user__p');
    const thirdUserUsername = document.querySelector('.third-user__username');
    const thirdUserPosition = document.querySelector('.third-user__position');
  
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'api/community', true);
    xhr.onload = () => {
      const data = JSON.parse(xhr.response);
      // first user
      const firstUser = data[0];
      firstUserImg.src = firstUser.avatar;
      firstUserUsername.innerHTML = `${firstUser.firstName} ${firstUser.lastName}`;
      firstUserP.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.';
      firstUserPosition.innerHTML = `${firstUser.position}`;
      // second user
      const secondUser = data[1];
      secondUserImg.src = secondUser.avatar;
      secondUserUsername.innerHTML = `${secondUser.firstName} ${secondUser.lastName}`;
      secondUserP.innerHTML = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.';
      secondUserPosition.innerHTML = `${secondUser.position}`;
      // third user
      const thirdUser = data[2];
      thirdUserImg.src = thirdUser.avatar;
      thirdUserUsername.innerHTML = `${thirdUser.firstName} ${thirdUser.lastName}`;
      thirdUserP.innerHTML = 'Aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
      thirdUserPosition.innerHTML = `${thirdUser.position}`;
    };
    xhr.send();
    performance.mark("communityEnd");
    performance.measure("community", "communityStart", "communityEnd");
  };
  