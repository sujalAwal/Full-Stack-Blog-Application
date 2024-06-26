<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('BlogIndex',[BlogController::class,'index']);
Route::get('viewPost/{id}',[BlogController::class,'show']);

Route::group(['prefix'=>'auth'],function ($router){
    Route::post('login',[AuthController::class,'login']);
    Route::post('signup',[AuthController::class,'register']);
});


Route::middleware(['auth:api'])->group(function (){
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
    Route::post('myBlog/{id}',[BlogController::class,'myBlog']);
    Route::post('store', [BlogController::class,'store']);
    Route::get('editPost/{id}', [BlogController::class,'edit']);
    Route::put('editPost/{id}', [BlogController::class,'update']);
    Route::delete('deletePost/{id}', [BlogController::class,'destroy']);
    
});