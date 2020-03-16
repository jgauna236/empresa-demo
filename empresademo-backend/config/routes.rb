Rails.application.routes.draw do
  post 'working_days/out/:employee_id' => 'working_days#out'
  post 'working_days/in/:employee_id' => 'working_days#in'
  get 'working_days/current/:employee_id' => 'working_days#current'
  get 'working_days/byemployeeid/:employee_id' => 'working_days#byemployeeid'
  get 'working_days/actives' => 'working_days#actives'
  post 'working_days/betweendates/' => 'working_days#betweendates'
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  resources :employers
  resources :employees
  post 'user_token' => 'user_token#create'
  get 'users/current' => 'users#current'
  get '/users/byusername/:username' => 'users#byusername' 
  get '/employees/byusername/:username' => 'employees#byusername' 
  get '/employees/byuserid/:user_id' => 'employees#byuserid' 
  get '/employers/byuserid/:user_id' => 'employers#byuserid' 
  resources :working_days
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
