import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  policeId: z.string().min(1, "Police ID is required").min(3, "Police ID must be at least 3 characters"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      policeId: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Placeholder for backend integration
      console.log("Login attempt:", { ...data, password: "[REDACTED]" });
      
      // Simulate API call
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome to the Smart Tourist Safety Monitoring System",
        });
        // Redirect to dashboard would happen here
        window.location.href = "/";
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid Police ID or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />
      
      <div className="relative w-full max-w-md">
        <Card className="border-border/50 shadow-elevated bg-gradient-to-b from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            {/* Logo Section */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1">
                <h1 className="text-lg font-semibold text-primary">Smart India Hackathon 2025</h1>
                <p className="text-sm text-muted-foreground font-medium">IDEA HACKERS</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">Police Dashboard</CardTitle>
              <CardDescription className="text-muted-foreground">
                Smart Tourist Safety Monitoring & Incident Response System
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Police ID Field */}
                <FormField
                  control={form.control}
                  name="policeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Police ID</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your Police ID"
                            className="pl-10 bg-input border-border focus:border-primary focus:ring-primary/20"
                          />
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 bg-input border-border focus:border-primary focus:ring-primary/20"
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <Label className="text-sm text-muted-foreground cursor-pointer">
                          Remember me
                        </Label>
                      </FormItem>
                    )}
                  />
                  
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                    onClick={() => {
                      toast({
                        title: "Password Recovery",
                        description: "Please contact your system administrator for password reset.",
                      });
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 transition-all duration-200 shadow-glow hover:shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Authorized personnel only. All activities are monitored and logged.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Smart Tourist Safety Monitoring System v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;