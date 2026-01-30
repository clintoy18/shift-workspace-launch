import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password, selectedRole);
      navigate(`/${selectedRole}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const mockLogins = [
    { email: "customer@example.com", password: "password", role: "customer" as UserRole },
    { email: "admin@example.com", password: "password", role: "admin" as UserRole },
    { email: "cashier@example.com", password: "password", role: "cashier" as UserRole },
  ];

  const handleQuickLogin = (mockRole: UserRole) => {
    const mock = mockLogins.find((m) => m.role === mockRole);
    if (mock) {
      setEmail(mock.email);
      setPassword(mock.password);
      setSelectedRole(mockRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-foreground">Shift</h1>
          <p className="text-center text-muted-foreground mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["customer", "admin", "cashier"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      handleQuickLogin(role);
                    }}
                    className={`py-2 px-3 rounded-lg font-medium transition-all text-sm capitalize ${
                      selectedRole === role
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 items-start">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>📌 Customer: customer@example.com</p>
              <p>📌 Admin: admin@example.com</p>
              <p>📌 Cashier: cashier@example.com</p>
              <p>🔑 Password: password</p>
            </div>
          </div>

          {/* Back to Landing */}
          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to landing page
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
