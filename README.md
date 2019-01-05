<h1>CELX-DEV</h1>

<h1>Un-Authenticated Calls</h1>

<h2>Register Call</h2>
<h4>Method: POST</h4>
<h4>URL:  /register</h4>
<h3>Params in Body:</h3>
<p>
name:String,</br>
email: String,</br>
password: String,</br>
mobile: Number,</br>
username: String,</br>
country : String</br>
</p>
<h3>Response:</h3>
<h4>Status Code: 409</h4>
<p>
message:"email already exists."
</p>

<h4>Status Code: 202</h4>
<p>
message:"User account created successfully."
</p>
<h4>Status Code: 403</h4>
<p>
message:"Email required."
</p>



<h2>LOGIN Call</h2>
<h4>Method: POST</h4>
<h4>URL:  /authenticate</h4>
<h3>Params in Body:</h3>
<p>

email: String,</br>
password: String</br>
</p>
<h3>Response:</h3>
<h4>Status Code: 200</h4>
<p>
{ success: true, </br>token: 'JWT ' + token, </br>user: found}
</p>
<h4>Status Code: 401</h4>
<p>
{ success: false, </br>message: 'password did not match.' }</br>
OR</br>
{ success: false, message: 'user not found' }
</br>
</p>
<h4>Status Code: 403</h4>
<p>
{ message: "Perameters Missing" }
</p>


<h2>Get Mobile Specs</h2>
<h4>Method: POST</h4>
<h4>URL:  /getMobileSpecs</h4>
<h3>Params in Body:</h3>
<p>

mobileName: String</br>
</p>
<h3>Response:</h3>
<h4>Status Code: 200</h4>
<p>
{ result : response }
</p>
<h4>Status Code: 403</h4>
<p>
{ message : "Mobile name is required" }  
</p>








<h1>Authenticated Calls</h1>


<h2>Place an Advertisement</h2>
<h4>Method: POST</h4>
<h4>URL:  /api/placeAdd</h4>
<h3>Params in Body:</h3>
<p>
advertID: String</br>
</p>
<p>
JSON of all Params</br>
</p>
<h3>Response:</h3>
<h4>Status Code: 202</h4>
<p>
{ result : result }
</p>
<h4>Status Code: 404</h4>
<p>
{ message : "Advertisement not found." }  
</p>


<h2>Search An Advertisement / Search Mobile Advertised</h2>
<h4>Method: POST</h4>
<h4>URL:  /api/searchMobile</h4>
<h3>Params in Body:</h3>
<p>
advertID: String</br>
</p>
<p>
JSON of all Params</br>
</p>
<h3>Response:</h3>
<h4>Status Code: 202</h4>
<p>
{ result : result }
</p>
<h4>Status Code: 404</h4>
<p>
{ message : "No match found." }  
</p>




<h2>Upload Mobile Images</h2>
<h4>Method: POST</h4>
<h4>URL:  /api/uploadImage</h4>
<h3>Params in Body:</h3>
<p>
advertID: String</br>
</p>
<p>
userFile: File (Image File)</br>
</p>
<h3>Response:</h3>
<h4>Status Code: 200</h4>
<p>
{ result : final }
</p>
<h4>Status Code: 404</h4>
<p>
{ message : "Advertisement not found." }  
</p>
