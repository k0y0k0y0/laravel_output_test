@extends('layouts.app')

@section('content')
  <div class="container">
    <h2>{{__('Drill List')}}</h2>
    <div class="row">
      @foreach ($drills as $drill)
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{ $drill->title}}</h3>
              <a href="#" class="btn btn-primary">{{__('Go Practice')}}</a>
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </div>
@endsection