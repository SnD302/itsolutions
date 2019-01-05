import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Category, Product } from './app.models';


export class Data {
public myaddsof:any;

constructor(public categories: Category[],
public compareList: Product[],

public wishList: Product[],
public cartList: Product[],
public totalPrice: number) {
}
}

@Injectable()
export class AppService {
public Data = new Data(
[], // categories
[], // compareList
[],  // wishList
[],  // cartList
null //totalPrice
)
public url = "assets/data/";
public API_URL = "https://celx-dev.herokuapp.com";
constructor(public http:HttpClient, public snackBar: MatSnackBar) { }

public getCategories(): Observable<Category[]>{
return this.http.get<Category[]>(this.url + 'categories.json');
}

public getProducts(userid,web,mycurrency)
{
if (localStorage.getItem('userid') !=null && localStorage.getItem('userid') !=undefined && localStorage.getItem('userid') !='')
{return this.http.post(this.API_URL + '/searchFilter', {user_id:localStorage.getItem('userid'),web:web,currency:mycurrency} );}
else{
  return this.http.post(this.API_URL + '/searchFilter', {web:web} );
}
}

public getFilters(categoryArray,priceFrom_1,priceTo_1,selectedcolor,selectedstorage,conditionsarray,brandsArray,userid)
{
  console.log(categoryArray,priceFrom_1,priceTo_1,selectedcolor,selectedstorage,conditionsarray,brandsArray,localStorage.getItem('userid'));
return this.http.post(this.API_URL + '/searchFilter', {priceStart:priceFrom_1,priceEnd:priceTo_1,color:selectedcolor,storage:selectedstorage,brandName:brandsArray,user_id:localStorage.getItem('userid')} );
}


// public dheaders()
// {
//   let headers= new HttpHeaders();
//   headers.append({Authorization:localStorage.getItem('jwt')});
// }
createAuthorizationHeader(headers: Headers) {
headers.append('Authorization', localStorage.getItem('jwt'));
console.log(headers);
}
public getenums()
{
return this.http.post(this.API_URL + '/getEnums', {});
}
public getProductById(id)
{
if (localStorage.getItem('jwt') !=null && localStorage.getItem('jwt') !=undefined && localStorage.getItem('jwt') !='')
{
  const httpOptions={
  headers: new HttpHeaders({'Content-Type':'application/json','Authorization': localStorage.getItem('jwt')   }) };
  console.log(httpOptions);
  console.log("authencticated");
  return this.http.post(this.API_URL + '/api/getAdvertisementDetails', {advert_id:id},httpOptions );
}
else{
  console.log("un-authencticated");
  return this.http.post(this.API_URL + '/getAdvertismentDetatils', {advert_id:id} );

}
}
public getmobiles(brand_id)
{
console.log(brand_id);
return this.http.post(this.API_URL + '/getMobileSpecs', {brand_id:brand_id});
}
public addAccessories()
{
const httpOptions={
headers: new HttpHeaders({'Content-Type':'application/json','Authorization': localStorage.getItem('jwt')   }) };
console.log(httpOptions);
return this.http.post(this.API_URL + '/api/getAllPhysicalIssues/accessories',{},httpOptions);
}
public addissues()
{
const httpOptions={
headers: new HttpHeaders({'Content-Type':'application/json','Authorization': localStorage.getItem('jwt')   }) };
console.log(httpOptions);
return this.http.post(this.API_URL + '/api/getAllPhysicalIssues/issues',{},httpOptions);
}
public phoneswitch()
{
const httpOptions={
headers: new HttpHeaders({'Content-Type':'application/json','Authorization': localStorage.getItem('jwt')   }) };
console.log(httpOptions);
return this.http.post(this.API_URL + '/api/phoneSwitchOn',{},httpOptions);
}
public createbrand(newbrand)
{
  console.log(newbrand);
const httpOptions={
headers: new HttpHeaders({'Content-Type':'application/json','Authorization': localStorage.getItem('jwt')   }) };
return this.http.post(this.API_URL + '/api/createMobileBrand',{brandName:newbrand},httpOptions);
}
public getbrand()
{   //let headers = new Headers();
const httpOptions =
{   headers: new HttpHeaders({     'Content-Type':  'application/json',     'Authorization': localStorage.getItem('jwt')   }) };
// var head = {
//   Authorization:localStorage.getItem('jwt');
// };
console.log(httpOptions);

//this.createAuthorizationHeader(headers);
return this.http.post(this.API_URL + '/getMobileBrands',
{});
//return this.http.post(this.API_URL + '/api/getMobileBrands', {header:headers});
//console.log("in API");
}
public upload_images(file,id)
{
const fd = new FormData();
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'multipart/form-data', 'enctype':'multipart/form-data', 'Authorization': localStorage.getItem('jwt')})};
console.log("services" ,file);
return this.http.post(this.API_URL + '/api/uploadImage/'+ id, {userFile:file,_id:id}, httpOptions);
}
public uploadImage(file,id)
{
  const fd= new FormData();
  fd.append('userFile',file,file.name);
  const aid = new FormData();
  aid.append('_id',id);
  console.log("services img",file,id);
  console.log(fd);
  console.log(aid);
return this.http.post(this.API_URL + '/uploadImageWeb/' + id, fd );
}
public phone_condition()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log(httpOptions);
return this.http.post(this.API_URL + '/api/getAllConditions', {}, httpOptions);
}
public phoneCondition()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log(httpOptions);
return this.http.post(this.API_URL + '/api/addCondition', {}, httpOptions);
}
public placeAdd(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,imei,switchonoff,condition_1,ag_1,accessoriesArray,issuesArray)
{
  console.log("in service : ",accessoriesArray);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log(httpOptions);
return this.http.post(this.API_URL + '/api/placeAddWeb', {title:title_1,type:category_1,brandName:brand_1.brandName,deviceDetails:mobile_1,price:parseFloat(price_1),description:description_1,color:color_1,storage:store_1,IMEI:imei,phoneDead:switchonoff,condition:condition_1,age:ag_1,accessories:accessoriesArray,physicalIssues:issuesArray}, httpOptions);
}

public verify_add(advert_id)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  console.log(httpOptions);
  return this.http.post(this.API_URL + '/api/verifyTrue', {advert_id:advert_id}, httpOptions);
}
public advertlocation(advert_id,latitude,longitude)
  {
  const httpOptions=
  { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
    console.log(httpOptions);
    return this.http.post(this.API_URL + '/api/updateAddLocation', {advert_id:advert_id,lat:latitude,lng:longitude}, httpOptions);
  }
public makeoffer(advertid,make_offer)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/makeOffer', {advert_id:advertid,price:make_offer}, httpOptions);
}
public report(advertid,report_type)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/report', {advert_id:advertid,type:report_type}, httpOptions);
}

public myadds()
{
  console.log("in ap service");
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/myAdds',{}, httpOptions);
}
public myPurchases()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/myPurchases',{}, httpOptions);
}

public updateUser(new_name,curr_lowercase)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/updateUser',{name:new_name,currency:curr_lowercase}, httpOptions);
}
public updateUserinregister(mobile_number,smsVerification)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwtr')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/updateUser',{mobile:mobile_number,smsVerification:smsVerification}, httpOptions);
}
public changepassword(old_pass,new_pass)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/changePassword',{oldPassword:old_pass,newPassword:new_pass}, httpOptions);
}
public uploaduserimage(file,id)
{
  const fd= new FormData();
  fd.append('userFile',file,file.name);
  const aid = new FormData();
  aid.append('_id',id);
  console.log("services img",file,id);
  console.log(fd);
  console.log(aid);
return this.http.post(this.API_URL + '/uploadUserImageWeb/'+ id, fd);
}

public getUserDetails()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/getUserDetails',{}, httpOptions);
}
public getAllChats()
  {
  const httpOptions=
  { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  console.log("after request");
  return this.http.post(this.API_URL + '/api/getAllChats',{}, httpOptions);
  }
public getAllMessages(myuserid,chathisid,chatadvertid)
{
  console.log(myuserid,chathisid,chatadvertid);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
console.log("after request");
return this.http.post(this.API_URL + '/api/getAllMessages',{myId:myuserid,hisId:chathisid,advert_id:chatadvertid}, httpOptions);
}
public myaddsoffers()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/getMyAddsOffers', {}, httpOptions);
}

public offersbyme()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/getAllOffersCreatedBySelf', {}, httpOptions);
}

public adverthistory()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/advertisementHistory', {}, httpOptions);
}

public favouriteadds()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/getFavouriteAdds', {}, httpOptions);
}
public boostad(boostmyad,boosttrue)
{
console.log(boostmyad,boosttrue);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/boostAdverisement', {advert_id:boostmyad,boost:boosttrue}, httpOptions);
}

public enabledisable(disid)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/enableDisableAdd', {advert_id:disid}, httpOptions);
}

public updateoffer(offeridnew,price)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/updateOfferCreatedBySelf', {offer_id:offeridnew,offered_price:price}, httpOptions);
}
public updateofferchat(matchedofferid,updateprice)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/updateOfferCreatedBySelf', {offer_id:matchedofferid,offered_price:updateprice}, httpOptions);
}

public counterofferchat(chatadvertid,chathisid,updateprice)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/createCounterOffer', {advert_id:chatadvertid,user_id:chathisid,price:updateprice}, httpOptions);
}
public accept(offerid,tick)
{
  console.log(tick);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/acceptRejectOffer', {offer_id:offerid,status:tick}, httpOptions);
//console.log(data);
}
public reject(offerid,cross)
{
  console.log(cross);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/acceptRejectOffer', {offer_id:offerid,status:cross}, httpOptions);
//console.log(data);
}

public getsale(saleIdseller)
{
  const httpOptions=
  { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  return this.http.post(this.API_URL + '/api/getSail', {sail_id:saleIdseller}, httpOptions);
}

public getsaleseller(sellersaleid)
{
  const httpOptions=
  { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  return this.http.post(this.API_URL + '/api/getSail', {sail_id:sellersaleid}, httpOptions);
}
public enteraddress(saleid,address)
{
  const httpOptions=
  { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  return this.http.post(this.API_URL + '/api/enterAddress', {sail_id:saleid,address:address}, httpOptions);
}

// public getusercards()
// {
//   const httpOptions=
//   { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
//   return this.http.post(this.API_URL + '/api/makePaymentWithCard', {advert_id:advertid,amount:amount,currency:currency,card_id:cardid}, httpOptions);
// }
public retreiveCustomerCards()
{
  const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  return this.http.post(this.API_URL + '/api/retreiveCustomerCards', {}, httpOptions);
}
public deletecard(card_id,stripeID)
{
  const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
  return this.http.post(this.API_URL + '/api/deleteCard', {card_id:card_id,stript_id:stripeID}, httpOptions);
}
public add_card(ExpiryMonth,ExpiryYear,Country,addresscountry,addresszip,cardNumber,csv)
{
  console.log(ExpiryMonth,ExpiryYear,Country,addresscountry,addresszip,cardNumber,csv);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/addUserCard', {exp_month:ExpiryMonth,exp_year:ExpiryYear,country:Country,address_country:addresscountry,address_zip:addresszip,number:cardNumber, csv:csv}, httpOptions);
}
public makePaymentWithCard(adverts,Amount,curr_lowercase,Card)
{
  console.log(adverts,Amount,curr_lowercase,Card);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/makePaymentWithCard', {advert_id:adverts,amount:Amount,currency:curr_lowercase,card_id:Card}, httpOptions);
}

public addcourierinfo(sellersaleid,courier,track)
{
  console.log(sellersaleid,courier,track);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/addCourierInfo', {sail_id:sellersaleid,courierServiceName:courier,tracking_id :track}, httpOptions);
}

public confirmdelivery(saleid,confirmstatus)
{
  console.log(saleid,confirmstatus);
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/courierReceived', {sail_id:saleid,status:confirmstatus}, httpOptions);
}

// public addtofavourites(advertid,add)
// {
// const httpOptions=
// { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
// return this.http.post(this.API_URL + '/api/addFavouriteAdds', {advert_id:advertid,add:add}, httpOptions);
// }
// public removefavourites(advertid,remove)
// {
// const httpOptions=
// { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
// return this.http.post(this.API_URL + '/api/addFavouriteAdds', {advert_id:advertid,add:remove}, httpOptions);
// }
public getallpackages()
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/getAllPackages', {}, httpOptions);
}

public addtofavourites(advertid,add)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/addFavouriteAdds', {advert_id:advertid,add:add}, httpOptions);
}
public removefavourites(advertid,remove)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/addFavouriteAdds', {advert_id:advertid,add:remove}, httpOptions);
}
public updateUserPackage(package_id)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/updateUserPackage', {package_id:package_id}, httpOptions);
}

public removeMyCreatedOffer(offeradvertid,offeridnew)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
return this.http.post(this.API_URL + '/api/removeMyCreatedOffer', {advert_id:offeradvertid,offer_id:offeridnew}, httpOptions);
}

public getBanners(): Observable<any[]>
{
return this.http.get<any[]>(this.url + 'banners.json');
}

public login1(email,password)
{
console.log("in login");
return this.http.post(this.API_URL + '/authenticate', {email:email,password:password} );
}

public register1(name,email1,password)
{
console.log("in services" , name,email1,password);
return this.http.post(this.API_URL + '/register', {name:name,email:email1,password:password});
}
public checkmobile(mobile_number)
{
const httpOptions=
{ headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwtr')})};
return this.http.post(this.API_URL + '/api/checkMobile', {mobile:mobile_number}, httpOptions);
}

public getLoggedIn(){
console.log("in services component");
//         return this.http.post(`${this.API_URL}/authenticate/`,JSON.stringify({email:"mohsin1111@gmail.com",password:"qwertyui"}),{});
return this.http.post<any[]>(this.API_URL + '/searchMobile',{},{});
}

public addToCompare(product:Product){
let message, status;
if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
  message = 'The product ' + product.name + ' already added to comparison list.';
  status = 'error';
}
else{
  this.Data.compareList.push(product);
  message = 'The product ' + product.name + ' has been added to comparison list.';
  status = 'success';
}
this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
}

public addToWishList(product:Product){
let message, status;
if(this.Data.wishList.filter(item=>item.id == product.id)[0]){
  message = 'The product ' + product.name + ' already added to wish list.';
  status = 'error';
}
else{
  this.Data.wishList.push(product);
  message = 'The Item ' + ' has been added to Favourites.';
  status = 'success';
}
this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
}

public addToCart(product:Product){
let message, status;
if(this.Data.cartList.filter(item=>item.id == product.id)[0]){
  message = 'The product ' + product.name + ' already added to cart.';
  status = 'error';
}
else{
  this.Data.totalPrice = null;
  this.Data.cartList.push(product);
  this.Data.cartList.forEach(product=>{
    this.Data.totalPrice = this.Data.totalPrice + product.newPrice;
  })
  message = 'The product ' + product.name + ' has been added to cart.';
  status = 'success';
}
this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
}

public getBrands(){
return [
  { name: 'aloha', image: 'assets/images/brands/aloha.png' },
  { name: 'dream', image: 'assets/images/brands/dream.png' },
  { name: 'congrats', image: 'assets/images/brands/congrats.png' },
  { name: 'best', image: 'assets/images/brands/best.png' },
  { name: 'original', image: 'assets/images/brands/original.png' },
  { name: 'retro', image: 'assets/images/brands/retro.png' },
  { name: 'king', image: 'assets/images/brands/king.png' },
  { name: 'love', image: 'assets/images/brands/love.png' },
  { name: 'the', image: 'assets/images/brands/the.png' },
  { name: 'easter', image: 'assets/images/brands/easter.png' },
  { name: 'with', image: 'assets/images/brands/with.png' },
  { name: 'special', image: 'assets/images/brands/special.png' },
  { name: 'bravo', image: 'assets/images/brands/bravo.png' }
];
}

public getCountries(){
return [
  {name: 'Afghanistan', code: 'AF'},
  {name: 'Aland Islands', code: 'AX'},
  {name: 'Albania', code: 'AL'},
  {name: 'Algeria', code: 'DZ'},
  {name: 'American Samoa', code: 'AS'},
  {name: 'AndorrA', code: 'AD'},
  {name: 'Angola', code: 'AO'},
  {name: 'Anguilla', code: 'AI'},
  {name: 'Antarctica', code: 'AQ'},
  {name: 'Antigua and Barbuda', code: 'AG'},
  {name: 'Argentina', code: 'AR'},
  {name: 'Armenia', code: 'AM'},
  {name: 'Aruba', code: 'AW'},
  {name: 'Australia', code: 'AU'},
  {name: 'Austria', code: 'AT'},
  {name: 'Azerbaijan', code: 'AZ'},
  {name: 'Bahamas', code: 'BS'},
  {name: 'Bahrain', code: 'BH'},
  {name: 'Bangladesh', code: 'BD'},
  {name: 'Barbados', code: 'BB'},
  {name: 'Belarus', code: 'BY'},
  {name: 'Belgium', code: 'BE'},
  {name: 'Belize', code: 'BZ'},
  {name: 'Benin', code: 'BJ'},
  {name: 'Bermuda', code: 'BM'},
  {name: 'Bhutan', code: 'BT'},
  {name: 'Bolivia', code: 'BO'},
  {name: 'Bosnia and Herzegovina', code: 'BA'},
  {name: 'Botswana', code: 'BW'},
  {name: 'Bouvet Island', code: 'BV'},
  {name: 'Brazil', code: 'BR'},
  {name: 'British Indian Ocean Territory', code: 'IO'},
  {name: 'Brunei Darussalam', code: 'BN'},
  {name: 'Bulgaria', code: 'BG'},
  {name: 'Burkina Faso', code: 'BF'},
  {name: 'Burundi', code: 'BI'},
  {name: 'Cambodia', code: 'KH'},
  {name: 'Cameroon', code: 'CM'},
  {name: 'Canada', code: 'CA'},
  {name: 'Cape Verde', code: 'CV'},
  {name: 'Cayman Islands', code: 'KY'},
  {name: 'Central African Republic', code: 'CF'},
  {name: 'Chad', code: 'TD'},
  {name: 'Chile', code: 'CL'},
  {name: 'China', code: 'CN'},
  {name: 'Christmas Island', code: 'CX'},
  {name: 'Cocos (Keeling) Islands', code: 'CC'},
  {name: 'Colombia', code: 'CO'},
  {name: 'Comoros', code: 'KM'},
  {name: 'Congo', code: 'CG'},
  {name: 'Congo, The Democratic Republic of the', code: 'CD'},
  {name: 'Cook Islands', code: 'CK'},
  {name: 'Costa Rica', code: 'CR'},
  {name: 'Cote D\'Ivoire', code: 'CI'},
  {name: 'Croatia', code: 'HR'},
  {name: 'Cuba', code: 'CU'},
  {name: 'Cyprus', code: 'CY'},
  {name: 'Czech Republic', code: 'CZ'},
  {name: 'Denmark', code: 'DK'},
  {name: 'Djibouti', code: 'DJ'},
  {name: 'Dominica', code: 'DM'},
  {name: 'Dominican Republic', code: 'DO'},
  {name: 'Ecuador', code: 'EC'},
  {name: 'Egypt', code: 'EG'},
  {name: 'El Salvador', code: 'SV'},
  {name: 'Equatorial Guinea', code: 'GQ'},
  {name: 'Eritrea', code: 'ER'},
  {name: 'Estonia', code: 'EE'},
  {name: 'Ethiopia', code: 'ET'},
  {name: 'Falkland Islands (Malvinas)', code: 'FK'},
  {name: 'Faroe Islands', code: 'FO'},
  {name: 'Fiji', code: 'FJ'},
  {name: 'Finland', code: 'FI'},
  {name: 'France', code: 'FR'},
  {name: 'French Guiana', code: 'GF'},
  {name: 'French Polynesia', code: 'PF'},
  {name: 'French Southern Territories', code: 'TF'},
  {name: 'Gabon', code: 'GA'},
  {name: 'Gambia', code: 'GM'},
  {name: 'Georgia', code: 'GE'},
  {name: 'Germany', code: 'DE'},
  {name: 'Ghana', code: 'GH'},
  {name: 'Gibraltar', code: 'GI'},
  {name: 'Greece', code: 'GR'},
  {name: 'Greenland', code: 'GL'},
  {name: 'Grenada', code: 'GD'},
  {name: 'Guadeloupe', code: 'GP'},
  {name: 'Guam', code: 'GU'},
  {name: 'Guatemala', code: 'GT'},
  {name: 'Guernsey', code: 'GG'},
  {name: 'Guinea', code: 'GN'},
  {name: 'Guinea-Bissau', code: 'GW'},
  {name: 'Guyana', code: 'GY'},
  {name: 'Haiti', code: 'HT'},
  {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
  {name: 'Holy See (Vatican City State)', code: 'VA'},
  {name: 'Honduras', code: 'HN'},
  {name: 'Hong Kong', code: 'HK'},
  {name: 'Hungary', code: 'HU'},
  {name: 'Iceland', code: 'IS'},
  {name: 'India', code: 'IN'},
  {name: 'Indonesia', code: 'ID'},
  {name: 'Iran, Islamic Republic Of', code: 'IR'},
  {name: 'Iraq', code: 'IQ'},
  {name: 'Ireland', code: 'IE'},
  {name: 'Isle of Man', code: 'IM'},
  {name: 'Israel', code: 'IL'},
  {name: 'Italy', code: 'IT'},
  {name: 'Jamaica', code: 'JM'},
  {name: 'Japan', code: 'JP'},
  {name: 'Jersey', code: 'JE'},
  {name: 'Jordan', code: 'JO'},
  {name: 'Kazakhstan', code: 'KZ'},
  {name: 'Kenya', code: 'KE'},
  {name: 'Kiribati', code: 'KI'},
  {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
  {name: 'Korea, Republic of', code: 'KR'},
  {name: 'Kuwait', code: 'KW'},
  {name: 'Kyrgyzstan', code: 'KG'},
  {name: 'Lao People\'S Democratic Republic', code: 'LA'},
  {name: 'Latvia', code: 'LV'},
  {name: 'Lebanon', code: 'LB'},
  {name: 'Lesotho', code: 'LS'},
  {name: 'Liberia', code: 'LR'},
  {name: 'Libyan Arab Jamahiriya', code: 'LY'},
  {name: 'Liechtenstein', code: 'LI'},
  {name: 'Lithuania', code: 'LT'},
  {name: 'Luxembourg', code: 'LU'},
  {name: 'Macao', code: 'MO'},
  {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
  {name: 'Madagascar', code: 'MG'},
  {name: 'Malawi', code: 'MW'},
  {name: 'Malaysia', code: 'MY'},
  {name: 'Maldives', code: 'MV'},
  {name: 'Mali', code: 'ML'},
  {name: 'Malta', code: 'MT'},
  {name: 'Marshall Islands', code: 'MH'},
  {name: 'Martinique', code: 'MQ'},
  {name: 'Mauritania', code: 'MR'},
  {name: 'Mauritius', code: 'MU'},
  {name: 'Mayotte', code: 'YT'},
  {name: 'Mexico', code: 'MX'},
  {name: 'Micronesia, Federated States of', code: 'FM'},
  {name: 'Moldova, Republic of', code: 'MD'},
  {name: 'Monaco', code: 'MC'},
  {name: 'Mongolia', code: 'MN'},
  {name: 'Montserrat', code: 'MS'},
  {name: 'Morocco', code: 'MA'},
  {name: 'Mozambique', code: 'MZ'},
  {name: 'Myanmar', code: 'MM'},
  {name: 'Namibia', code: 'NA'},
  {name: 'Nauru', code: 'NR'},
  {name: 'Nepal', code: 'NP'},
  {name: 'Netherlands', code: 'NL'},
  {name: 'Netherlands Antilles', code: 'AN'},
  {name: 'New Caledonia', code: 'NC'},
  {name: 'New Zealand', code: 'NZ'},
  {name: 'Nicaragua', code: 'NI'},
  {name: 'Niger', code: 'NE'},
  {name: 'Nigeria', code: 'NG'},
  {name: 'Niue', code: 'NU'},
  {name: 'Norfolk Island', code: 'NF'},
  {name: 'Northern Mariana Islands', code: 'MP'},
  {name: 'Norway', code: 'NO'},
  {name: 'Oman', code: 'OM'},
  {name: 'Pakistan', code: 'PK'},
  {name: 'Palau', code: 'PW'},
  {name: 'Palestinian Territory, Occupied', code: 'PS'},
  {name: 'Panama', code: 'PA'},
  {name: 'Papua New Guinea', code: 'PG'},
  {name: 'Paraguay', code: 'PY'},
  {name: 'Peru', code: 'PE'},
  {name: 'Philippines', code: 'PH'},
  {name: 'Pitcairn', code: 'PN'},
  {name: 'Poland', code: 'PL'},
  {name: 'Portugal', code: 'PT'},
  {name: 'Puerto Rico', code: 'PR'},
  {name: 'Qatar', code: 'QA'},
  {name: 'Reunion', code: 'RE'},
  {name: 'Romania', code: 'RO'},
  {name: 'Russian Federation', code: 'RU'},
  {name: 'RWANDA', code: 'RW'},
  {name: 'Saint Helena', code: 'SH'},
  {name: 'Saint Kitts and Nevis', code: 'KN'},
  {name: 'Saint Lucia', code: 'LC'},
  {name: 'Saint Pierre and Miquelon', code: 'PM'},
  {name: 'Saint Vincent and the Grenadines', code: 'VC'},
  {name: 'Samoa', code: 'WS'},
  {name: 'San Marino', code: 'SM'},
  {name: 'Sao Tome and Principe', code: 'ST'},
  {name: 'Saudi Arabia', code: 'SA'},
  {name: 'Senegal', code: 'SN'},
  {name: 'Serbia and Montenegro', code: 'CS'},
  {name: 'Seychelles', code: 'SC'},
  {name: 'Sierra Leone', code: 'SL'},
  {name: 'Singapore', code: 'SG'},
  {name: 'Slovakia', code: 'SK'},
  {name: 'Slovenia', code: 'SI'},
  {name: 'Solomon Islands', code: 'SB'},
  {name: 'Somalia', code: 'SO'},
  {name: 'South Africa', code: 'ZA'},
  {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
  {name: 'Spain', code: 'ES'},
  {name: 'Sri Lanka', code: 'LK'},
  {name: 'Sudan', code: 'SD'},
  {name: 'Suriname', code: 'SR'},
  {name: 'Svalbard and Jan Mayen', code: 'SJ'},
  {name: 'Swaziland', code: 'SZ'},
  {name: 'Sweden', code: 'SE'},
  {name: 'Switzerland', code: 'CH'},
  {name: 'Syrian Arab Republic', code: 'SY'},
  {name: 'Taiwan, Province of China', code: 'TW'},
  {name: 'Tajikistan', code: 'TJ'},
  {name: 'Tanzania, United Republic of', code: 'TZ'},
  {name: 'Thailand', code: 'TH'},
  {name: 'Timor-Leste', code: 'TL'},
  {name: 'Togo', code: 'TG'},
  {name: 'Tokelau', code: 'TK'},
  {name: 'Tonga', code: 'TO'},
  {name: 'Trinidad and Tobago', code: 'TT'},
  {name: 'Tunisia', code: 'TN'},
  {name: 'Turkey', code: 'TR'},
  {name: 'Turkmenistan', code: 'TM'},
  {name: 'Turks and Caicos Islands', code: 'TC'},
  {name: 'Tuvalu', code: 'TV'},
  {name: 'Uganda', code: 'UG'},
  {name: 'Ukraine', code: 'UA'},
  {name: 'United Arab Emirates', code: 'AE'},
  {name: 'United Kingdom', code: 'GB'},
  {name: 'United States', code: 'US'},
  {name: 'United States Minor Outlying Islands', code: 'UM'},
  {name: 'Uruguay', code: 'UY'},
  {name: 'Uzbekistan', code: 'UZ'},
  {name: 'Vanuatu', code: 'VU'},
  {name: 'Venezuela', code: 'VE'},
  {name: 'Viet Nam', code: 'VN'},
  {name: 'Virgin Islands, British', code: 'VG'},
  {name: 'Virgin Islands, U.S.', code: 'VI'},
  {name: 'Wallis and Futuna', code: 'WF'},
  {name: 'Western Sahara', code: 'EH'},
  {name: 'Yemen', code: 'YE'},
  {name: 'Zambia', code: 'ZM'},
  {name: 'Zimbabwe', code: 'ZW'}
]
}

public getMonths(){
return [
  { value: '01', name: 'January' },
  { value: '02', name: 'February' },
  { value: '03', name: 'March' },
  { value: '04', name: 'April' },
  { value: '05', name: 'May' },
  { value: '06', name: 'June' },
  { value: '07', name: 'July' },
  { value: '08', name: 'August' },
  { value: '09', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' }
]
}

public getYears(){
  return [
    { value: '18', name: '2018' },
    { value: '19', name: '2019' },
    { value: '20', name: '2020' },
    { value: '21', name: '2021' },
    { value: '22', name: '2022' },
    { value: '23', name: '2023' },
    { value: '24', name: '2024' },
    { value: '25', name: '2025' },
    { value: '26', name: '2026' },
    { value: '27', name: '2027' },
    { value: '28', name: '2028' },
    { value: '29', name: '2029' },
    { value: '30', name: '2030' }
  ]
}

public getDeliveryMethods(){
return [
  { value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
  { value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
  { value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' }
]
}

}
