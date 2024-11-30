import { KeyboardAvoidingViewContainer } from "./KeyboardAvoidingViewContainer";
import { TopCircleGradient } from "@/components/TopCircleGradient";

type AuthLayoutProps = {
    children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <KeyboardAvoidingViewContainer>
            <TopCircleGradient />
            {children}
        </KeyboardAvoidingViewContainer>
    );
}
