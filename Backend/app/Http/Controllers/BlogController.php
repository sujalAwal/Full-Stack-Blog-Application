<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Throwable;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $allBlog = Blog::with(['user'])->where('is_publish','published')->get();
        return response()->json(['blog'=>$allBlog,],200);
    }
    public function myBlog(string $id)
    {
      
        $blog = Blog::with(['user'])->where('user_id',$id)->get();
        if($blog){

        
        return response()->json(['message'=>'Successfully Fetched Blog Details','blog'=>$blog,'user'=>3],200);
        }else{
            return response()->json(['message'=>'No BLogs Found...Error '],405); 
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $result = Validator::make($request->all(),[
            'id'=>'required',
            'title'=>'required|min:5|unique:blogs',
            'body'=>'required|min:25',
            'ispublish'=>'required',
            'img'=>'required|image'
        ]); 

        if($result->fails()){
            return response()->json(['errors' => $result->errors()], 400);
        }
        
        DB::beginTransaction();
        try{
            $imageName = time().'.'.$request->img->extension();
           

            $Blog = Blog::create([
            'title' => $request->title,
            'description' => $request->body,
            'is_publish' => $request->ispublish,
            'image' => $imageName,
            'user_id'=>$request->id,

        ]);
        
        $request->img->move(public_path('images'), $imageName);
        DB::commit();
    }catch(Throwable $th){
        DB::rollBack();
        return response()->json(['message'=>"fAiled to upload your blog.Try Again"]);
    }
       return response()->json(['data'=> $result]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       try{

       
       $blog = Blog::with(['user'])->where('id',$id)->first();
       return response()->json(['status'=>'Succesfull','blog'=>$blog]);
    }catch(Throwable $th){
    return $th;}

}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $blog = Blog::where('id',$id)->first();
        if($blog){
           
            return response()->json([
                'status' => 'success',
                'blog' => $blog,
                'blog_id' => $id
            ], 200);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found',
                'post_id' => $id
            ], 404);  
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $result = Validator::make($request->all(),[
            'user_id'=>'required',
            'blogId'=>'required',
            'title'=>'required|min:5',
            'body'=>'required|min:25',
            'ispublish'=>'required',
            'img'=>'required|image'
        ]); 

        if($result->fails()){
            return response()->json(['errors' => $result->errors()], 400);
        }else{
            $img_path = public_path('images/'.$request->img);
            if(file_exists($img_path)){

                unlink($img_path);
            }else{
                $imageName = time().'.'.$request->img->extension();
            
            Blog::where('id',$request->blogId)->update(['title'=>$request->title,'description'=>$request->body,'is_publish'=>$request->ispublish,'image'=>$imageName]);
            $request->img->move(public_path('images'), $imageName);

            return response()->json(['message'=>"Post Edited successfully"],200);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Blog::find($id);
        if($post){
            $img_path = public_path('images/'.$post->image);
            if(file_exists($img_path)){
                unlink($img_path);
            }
            $post->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Post deleted successfully',
                'post_id' => $id
            ], 200);
        }
        else{   return response()->json([
            'status' => 'Error',
            'message' => 'Post not found',
            'post_id' => $id
        ], 404);
    }
    }
}
