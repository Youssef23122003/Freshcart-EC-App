import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Core/Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Core/Layouts/blank-layout/blank-layout.component';
import { Register } from './Core/Auth/register/register.component';
import { Login } from './Core/Auth/login/login.component';
import { ForgetPassword } from './Core/Auth/forget-password/forget-password.component';
import { ResetPassword } from './Core/Auth/reset-password/reset-password.component';
import { VerifyCode } from './Core/Auth/verify-code/verify-code.component';
import { Home } from './Features/home/home.component';
import { Brands } from './Features/brands/brands.component';
import { Products } from './Features/products/products.component';
import { Categories } from './Features/categories/categories.component';
import { ProductDetails } from './Features/product-details/product-details.component';
import { CheckOut } from './Features/check-out/check-out.component';
import { Cart } from './Features/cart/cart.component';
import { NotFound } from './Features/not-found/not-found.component';
import { authGuard } from './Core/Guards/auth-guard';
import { isloogedGuard } from './Core/Guards/islooged-guard';
import { AllOrdersComponent } from './Features/all-orders/all-orders.component';
import { WishlistComponent } from './Shared/Components/wishlist/wishlist.component';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent,canActivate:[isloogedGuard],children:[
    {path:'register',component:Register,title:'Register'},
    {path:'login',component:Login,title:'Login'},
    {path:'forget-password',component:ForgetPassword,title:'Forget-Password'},
    {path:'reset-password',component:ResetPassword,title:'Reset-Password'},
    {path:'verify-code',component:VerifyCode,title:'Verify-Code'},

  ]},
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'home',component:Home,title:'Home Page'},
    {path:'brands',component:Brands,title:'Brands Page'},
    {path:'products',component:Products,title:'Products Page'},
    {path:'categories',component:Categories,title:'Categories Page'},
    {path:'product-details/:slug/:id',component:ProductDetails,title:'Product-Details Page'},
    {path:'check-out/:id',component:CheckOut,title:'Check-Out Page'},
    {path:'cart',component:Cart,title:'Cart Page'},
    {path:'allorders',component:AllOrdersComponent,title:'All-Orders Page'},
    {path:'wishlist',component:WishlistComponent,title:'Wishlist page'}
  ]},
  {path:'**',component:NotFound}
];
