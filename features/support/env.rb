require 'aruba/cucumber'

Given /^PENDING (.*)/ do |reason|
  puts "I'm one of the good guys! #{reason}"
  pending
end
