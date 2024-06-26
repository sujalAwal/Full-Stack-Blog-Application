<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    protected $userDetail;
    protected $message ;
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:15',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json(['message' => 'Registration successful', 'user' => $user], 201);
    }
    public function login(Request $request)
    {
       
        $credentials = $request->only('email', 'password');

        if (! Auth::attempt($credentials)) {
            $this->message = 'Check your Password';
           
            return response()->json(['error' => 'Unauthorized','attempt'=>$this->message ], 401);
        }

        else{
            $this->userDetail = User::where('email',$request->email)->first()->only('id');
            $this->message = "Login Successfull  ";
        $user= User::where('eamil',$request->email)->get();
        $token = auth('api')->login(Auth::user());
        return $this->respondWithToken($token);
        }}

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'user'=>$this->userDetail['id'],
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'message'=>$this->message,
        ]);
    }
}
