import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SellComponent } from './pages/sell/sell/sell.component';
import { PostComponent } from './post/post.component';
import { Sell1Component } from './pages/sell1/sell1.component';
import { SigComponent } from './pages/sig/sig.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { MyaccsComponent } from './pages/myaccs/myaccs.component';
import { Offer_detailsComponent } from './pages/offer_details/offer_details.component';
//import { AccComponent } from './pages/accounts/acc/acc.component';


export const routes: Routes = [
{ path: 'post', component: PostComponent },
//{ path: 'sell', component: SellComponent },
{ path: 'sell', component: Sell1Component },
{ path: 'sign-in', component: SigComponent },
{ path: 'account', component: MyaccsComponent },
//{ path: 'acc', component: AccComponent },
{ path: 'accounts', component: AccountsComponent },
{ path: 'offers', component: Offer_detailsComponent, data: { breadcrumb: 'Offers', } },
    {
        path: '',
        component: PagesComponent, children: [
//            { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },
            // { path: 'account', loadChildren: 'app/pages/account/account.module#AccountModule', data: { breadcrumb: 'Account Settings' } },
            { path: 'compare', loadChildren: 'app/pages/compare/compare.module#CompareModule', data: { breadcrumb: 'Compare' } },
            { path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule', data: { breadcrumb: 'Wishlist' } },
            { path: 'cart', loadChildren: 'app/pages/cart/cart.module#CartModule', data: { breadcrumb: 'Cart' } },
            { path: 'Sell', loadChildren: 'app/pages/sell1/sell1.module#Sell1Module', data: { breadcrumb: 'Sell' } },
            { path: 'checkout', loadChildren: 'app/pages/checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Contact' } },
            // { path: 'sign-in', loadChildren: 'app/pages/sign-in/sign-in.module#SignInModule', data: { breadcrumb: 'Sign In ' } },
            { path: 'brands', loadChildren: 'app/pages/brands/brands.module#BrandsModule', data: { breadcrumb: 'Brands' } },
            { path: 'products', loadChildren: 'app/pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } },
            { path: '', loadChildren: 'app/pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } }
        ]
    },
    { path: '**', component: NotFoundComponent },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});
