import {UserManager} from '../../../../storage';
import {Icon} from '../../../../../assets/images';
import {Screen} from '../../../../router/screen';

export const deftabData = data => {
  let tempData = [
    {
      id: 1,
      title: data?.hourly ?? 'Hourly',
    },
    {
      id: 2,
      title: data?.weekly ?? 'Weekly',
    },
    {
      id: 3,
      title: data?.monthly ?? 'Monthly',
    },
  ];

  return tempData;
};

export const defCardData = (data, UserAddress) => {

  let tempData = [
    {
      id: 2,
      image: Icon.cropAdvisory,
      name: data?.my_crop_advisory ?? 'My Crop Advisory',
      type: 'Advisory Crop',
      color: palette.buttonYellow,
      IconsStatus: true,
    },
    {
      id: 3,
      image: Icon.product,
      name: data?.buy_products ?? 'Buy Products',
      color: palette.buttonYellow,
      navigation: Screen.product,
      IconsStatus: false,
    },
    {
      id: 7,
      image: Icon.marketIcon,
      name: data?.market_value ?? 'Market Value',
      navigation: Screen.marketValue,
      IconsStatus: false,
    },
    {
      id: 9,
      image: Icon.expertIcon,
      name: data?.ask_expert ?? 'Ask An Experts',
      type: 'Advisory Quries',
      IconsStatus: false,
    },
    {
      id: 10,
      image: Icon.videoLogo,
      name: data?.video ?? 'Agri Video',
      navigation: Screen.adVideo,
      IconsStatus: false,
    },
    {
      id: 11,
      image: Icon.gromorstore,
      name: data?.mana_gromor_store ?? 'Mana Gromor Store',
      navigation: Screen.gromorStore,
      IconsStatus: false,
    },
    {
      id: 13,
      image: Icon.gromorstore,
      name: data?.my_services ??'My Services',
      navigation: Screen.gromorStore,
      IconsStatus: false,
    },
  ];

  if (UserAddress?.isHNI) {
    if (tempData[0]?.id !== 1) {
      let lblFeed = {
        id: 1,
        image: Icon.crown,
        name: data?.polyhouse_specific ?? 'Polyhouse Specific',
        color: palette.buttonYellow,
        type: 'Advisory HNI',
        IconsStatus: false,
      };
      tempData.push(lblFeed);
    }
    if (tempData[7]?.id !== 8) {
      let lblFeed = {
        id: 8,
        image: Icon.telephone,
        name: data?.order_on_call ?? 'Order on Call',
        navigation: Screen.viewAllDealers,
        IconsStatus: false,
      };
      tempData.push(lblFeed);
    }
  }

  if (UserAddress?.features?.isFeedsEnabled) {
    let lblFeed = {
      id: 4,
      image: Icon.Feed,
      name: data?.lblFeeds ?? 'Feeds',
      navigation: Screen.postFeed,
      IconsStatus: false,
    };
    tempData.push(lblFeed);
  }

  if (UserAddress?.features?.isFarmlandEnabled) {
    let lblFeed = {
      id: 5,
      image: Icon.farmland,
      name: data?.my_farmland ?? 'My Farmland',
      color: palette.buttonYellow,
      type: 'Advisory Farmland',
      IconsStatus: true,
    };
    tempData.push(lblFeed);
  }

  if (UserAddress?.features?.isPlantixEnabled) {
    let lblFeed = {
      id: 6,
      image: Icon.Crop_Doctor,
      name: data?.lblCropDoctor ?? 'Crop Doctor',
      navigation: Screen.Plantix,
      IconsStatus: true,
    };
    tempData.push(lblFeed);
  }

  // if (UserAddress?.features?.isFarmlandEnabled) {
  //     let lblFeed = {
  //         id: 12, image: Icon.fyllo, name: data?.libFyllo ?? 'Fyllo',
  //         color: palette.buttonYellow,IconsStatus : true
  //     }
  //     tempData.push(lblFeed)
  // }

  tempData.sort(function (a, b) {
    return a.id - b.id;
  });

  return tempData;
};

import {Configuration} from '../../../../config/index';
import {isEmpty} from '../../../../utils/validator';
import { palette } from '../../../../theme/color';

export const defConfigImageURL = (APIImageURL, Data) => {
  let tempData = isEmpty(APIImageURL)
    ? Configuration.ImageURL + Data
    : APIImageURL + Data;
  return tempData;
};
