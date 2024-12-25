/*import Vue from 'vue'; // Make sure Vue is imported
import VueRouter from 'vue-router';*/
import home from "./components/home.js";
import adminlogin from "./components/adminLogin.js"
import admindash from "./components/admin_dash.js";
import userLogin from "./components/userLogin.js";
import userRegistration from "./components/UserRegistration.js";
import influencerdashboard from "./components/inf_dash.js";
import sponsordashboard from "./components/spon_dash.js";
import sponCampCreate from "./components/spon_camp_create.js"
import sponAdCreate from "./components/spon_ad_create.js"
import SponCamp from "./components/spon_your_camp.js";
import sponCampUpdate from "./components/spon_camp_update.js";
import SponAd from "./components/spon_your_ad.js";
import sponAdUpdate from "./components/spon_ad_update.js";
import sponSearchInflu from "./components/spon_search_influ.js";
import influencerPreference from "./components/inf_pref.js";
import InfluSearchCamp from "./components/influ-search-camp.js";
import ChosenCampaigns from "./components/inf-chosen-camps.js";
import flaggedAdDetails from "./components/flagged_ads.js";
import flaggedCampaignDetails from "./components/flagged_camp.js";
import othercampdetails from "./components/camp_details.js";
import otheraddetails from "./components/ad_details.js";
import sponmsg from "./components/spon_msg.js";
import influencermsg from "./components/inf_msg.js";
Vue.use(VueRouter);
const routes = [
  {
    name: "home",
    path: "/",
    component: home,
  },
  {
    name: "adminlogin",
    path: "/adminlogin",
    component: adminlogin,
    props: true
  },
  {
    name:"admin_dash",
    path: "/admin/dashboard",
    component: admindash,
    props: true
  },
  {
    name:"userLogin",
    path: "/userlogin",
    component: userLogin,
  },
  {
    name:"userRegistration",
    path: "/userlogin/sign_up",
    component: userRegistration,
  },
  {
    name: "influencerdashboard",
    path: "/userlogin/inf_dash/:username",
    component: influencerdashboard,
    props: true
  },
  {
    name: "sponsordashboard",
    path: "/userlogin/spon_dash/:username",
    component: sponsordashboard,
    props: true
  },
  {
    name: "sponCampCreate",
    path: "/userlogin/spon_dash/create_task/:username",
    component: sponCampCreate,
    props: true
  },
  {
    name: "sponAdCreate",
    path: "/userlogin/spon_dash/create_ad/:username",
    component: sponAdCreate,
    props: true
  },
  {
    name: "SponCamp",
    path: "/userlogin/spon_dash/your_camp/:username",
    component: SponCamp
  },
  {
    name: "sponCampUpdate",
    path: "/userlogin/spon_dash/update_task/:taskId/:username",
    component:sponCampUpdate,
    props: true
  },
  {
    name: "SponAd",
    path: "/userlogin/spon_dash/your_ad/:username",
    component: SponAd
  },
  {
    name: "sponAdUpdate",
    path: "/userlogin/spon_dash/update_ad/:taskId/:username",
    component: sponAdUpdate,
    props: true
  },
  {
    name: "sponSearchInflu",
    path: "/userlogin/spon_dash/search_influ/:username",
    component:sponSearchInflu,
    props:true
  },
  {
    name: "influencerPreference",
    path: "/userlogin/inf_dash/submit_your_like/:username",
    component: influencerPreference,
    props: true
  },
  {
    name: "InfluSearchCamp",
    path: "/userlogin/inf_dash/camps/:username",
    component: InfluSearchCamp,
    props: true
  },
  {
    name: "ChosenCampaigns",
    path: "/userlogin/inf_dash/your_camps/:username",
    component: ChosenCampaigns,
    props: true
  },
  {
    name: "flaggedAdDetails",
    path: "/admin/flagged_ads",
    component: flaggedAdDetails
  },
  {
    name: "flaggedCampaignDetails",
    path: "/admin/flagged_camps",
    component: flaggedCampaignDetails
  },
  {
    name: "othercampdetails",
    path: "/userlogin/spon_dash/other_camp_details/:camp_id/:username",
    component: othercampdetails,
    props: true
  },
  {
    name: "otheraddetails",
    path: "/userlogin/spon_dash/other_ad_details/:ad_id/:username",
    component: otheraddetails,
    props: true
  },
  {
    name: "sponmsg",
    path: "/userlogin/spon_dash/send_message/:username",
    component:sponmsg,
    props:true
  },
  {
    name: "influencermsg",
    path: "/userlogin/influencer_dash/send_message/:username",
    component: influencermsg,
    props: true
  }
];

const router = new VueRouter({
    routes,
});
export default router;